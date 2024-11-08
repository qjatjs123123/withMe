import React, { useState, useEffect } from 'react';
import { getCookieValue } from '@/util/axiosConfigClient';
import { FaArrowCircleUp } from 'react-icons/fa';
import { FaCircleStop } from 'react-icons/fa6';
import { useActiveId } from '../_contexts/ActiveIdContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';
import { useAIDraft } from '../_contexts/AIDraftContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';
import ClipBoardButton from './ClipBoardButton';

export function AIDraft() {
  const { activeId } = useActiveId();
  const { menuItems } = useMenuItems();
  const { messages, addMessage } = useAIDraft();
  const [activeLabel, setActiveLabel] = useState<string>();
  const [promptValue, setPromptValue] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [accumulatedContent, setAccumulatedContent] = useState<string>('');
  const [reader, setReader] = useState<ReadableStreamDefaultReader | null>(null);
  const [cancelDelay, setCancelDelay] = useState(false);

  useEffect(() => {
    const activeMenuItem = menuItems.find((item) => item.id === activeId);
    setActiveLabel(activeMenuItem ? activeMenuItem.label : '');
  }, [menuItems, activeId]);

  useEffect(() => {
    if (accumulatedContent) {
      console.log(accumulatedContent);

      addMessage({ text: accumulatedContent, isUser: false });
      setAccumulatedContent(''); // 메시지 추가 후 초기화
    }
  }, [isStreaming]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!promptValue) return;

    addMessage({ text: promptValue, isUser: true });
    setPromptValue('');
    startStreamingResponse();
  };

  const userDataCookie = getCookieValue('userData');
  const userData = JSON.parse(userDataCookie as string);

  const startStreamingResponse = async () => {
    setIsStreaming(true);
    setAccumulatedContent('');
    setCancelDelay(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/readme/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.access_token}`,
        },
        body: JSON.stringify({
          workspace_id: 95, // 수정 예정: 현재 선택된 레포명
          section_name: activeLabel,
          user_prompt: promptValue,
        }),
      });

      if (!response.body) throw new Error('ReadableStream not supported in this environment');

      const readerInstance = response.body.getReader();
      setReader(readerInstance);
      const decoder = new TextDecoder();

      let isReading = true;

      while (isReading) {
        const { value, done } = await readerInstance.read();
        if (done) {
          isReading = false;
          break;
        }

        // 디코딩한 스트림 데이터를 `data:` 접두사를 제거한 후 파싱 준비
        const chunk = decoder.decode(value, { stream: true }).trim();
        const lines = chunk.split('\n'); // 여러 줄로 분리

        for (const line of lines) {
          // "data:"로 시작하는 줄만 처리
          if (line.startsWith('data:')) {
            const jsonString = line.slice(5).trim();

            if (jsonString === '[DONE]') {
              // [DONE] 신호를 받으면 스트리밍 종료
              isReading = false;
              break;
            }

            try {
              const jsonData = JSON.parse(jsonString);

              // content가 존재하는 경우에만 처리
              if (jsonData.choices && jsonData.choices[0].delta.content) {
                const content = jsonData.choices[0].delta.content;
                console.log('Received content:', content);

                for (const char of content) {
                  if (cancelDelay) {
                    setIsStreaming(false);
                    setAccumulatedContent('');
                    return;
                  }

                  await new Promise((resolve) => setTimeout(resolve, 20)); // 30ms 딜레이
                  setAccumulatedContent((prevContent) => prevContent + char);
                }
              }
            } catch (error) {
              console.error('Failed to parse JSON chunk:', error);
            }
          }
        }
      }

      readerInstance.releaseLock();
      setReader(null);
    } catch (error) {
      console.error('Error processing POST response stream:', error);
    } finally {
      setIsStreaming(false);
    }
  };

  const stopStreamingResponse = () => {
    if (reader) {
      reader.cancel();
      setReader(null);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isStreaming) {
      event.preventDefault();
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-5 rounded-xl bg-gray-50">
      <div className="text-lg font-semibold mb-4">현재 목차: {activeLabel}</div>
      <div className="flex-grow rounded-lg p-4 overflow-auto">
        {messages.map((message, idx) => (
          <div key={idx} className={`mb-2 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-3 rounded-lg max-w-[80%]`}
              style={{ backgroundColor: message.isUser ? '#e5e7eb' : 'white' }}
            >
              {message.isUser ? (
                // 사용자 메시지: 일반 텍스트와 줄바꿈 처리
                message.text.split('\n').map((line, lineIdx) => (
                  <React.Fragment key={lineIdx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                // 사용자 외 메시지: Markdown 플러그인 적용
                <div className="relative">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                    className="markdown-body"
                  >
                    {message.text}
                  </ReactMarkdown>
                  <ClipBoardButton message={message.text} />
                </div>
              )}
            </div>
          </div>
        ))}

        {accumulatedContent && (
          <div className="mb-2 flex p-3 justify-start rounded-lg bg-white max-w-[80%] markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-body"
            >
              {accumulatedContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
      <div className="relative">
        <textarea
          value={promptValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="메시지 ChatGPT"
          className="w-full p-3 bg-[#F1F1F1] rounded-lg h-24 resize-none pr-20 focus:outline-none focus:border-none"
        />
        <button
          onClick={isStreaming ? stopStreamingResponse : handleSubmit}
          className="absolute bottom-2 right-2 pb-2 rounded-full "
          disabled={isStreaming && !reader}
        >
          {isStreaming ? <FaCircleStop size={32} /> : <FaArrowCircleUp size={32} />}
        </button>
      </div>
    </div>
  );
}
