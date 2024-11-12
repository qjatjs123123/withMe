import React, { useState, useEffect } from 'react';
import { getCookieValue } from '@/util/axiosConfigClient';
import { useActiveId } from '../_contexts/ActiveIdContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';
import { useAIDraft } from '../_contexts/AIDraftContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';
import ClipBoardButton from './ClipBoardButton';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export function AIDraft() {
  const { activeId } = useActiveId();
  const { menuItems } = useMenuItems();
  const { messages, addMessage } = useAIDraft();
  const [activeLabel, setActiveLabel] = useState<string>();
  const [isStreaming, setIsStreaming] = useState(false);
  const [accumulatedContent, setAccumulatedContent] = useState<string>('');
  const [reader, setReader] = useState<ReadableStreamDefaultReader | null>(null);
  const [cancelDelay, setCancelDelay] = useState(false);
  const params = useParams();
  const workspaceId = params.id;

  useEffect(() => {
    const activeMenuItem = menuItems.find((item) => item.id === activeId);
    setActiveLabel(activeMenuItem ? activeMenuItem.label : '');
  }, [menuItems, activeId]);

  useEffect(() => {
    if (accumulatedContent) {
      addMessage({ text: accumulatedContent });
      setAccumulatedContent(''); // 메시지 추가 후 초기화
    }
  }, [isStreaming]);

  const handleSubmit = () => {
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
          workspace_id: workspaceId,
          section_name: activeLabel,
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

                for (const char of content) {
                  if (cancelDelay) {
                    setIsStreaming(false);
                    setAccumulatedContent('');
                    return;
                  }

                  await new Promise((resolve) => setTimeout(resolve, 20)); // 20ms 딜레이
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

  return (
    <div className="flex flex-col w-full h-full p-5 rounded-xl bg-gray-50">
      <div className="text-lg font-semibold mb-4">현재 목차: {activeLabel}</div>
      <div className="flex-grow rounded-lg p-4 overflow-auto">
        {messages.map((message, idx) => (
          <div key={idx} className={`ml-2 mb-4 flex p-3 justify-center rounded-lg max-w-[750px] bg-white relative`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-body flex flex-col justify-start items-start text-left w-full"
            >
              {message.text}
            </ReactMarkdown>
            <ClipBoardButton message={message.text} />
          </div>
        ))}

        {accumulatedContent && (
          <div className="ml-2 mb-4 flex p-3 justify-center rounded-lg  max-w-[750px] bg-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-body flex flex-col justify-start items-start text-left w-full"
            >
              {accumulatedContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={handleSubmit}
          className={`absolute bottom-[610px] right-3 pb-2 rounded-full ${isStreaming ? 'pointer-events-none' : ''}`}
          disabled={isStreaming && !reader}
        >
          {isStreaming ? (
            <div className="bg-[#f1f0f0] text-gray-500 w-[220px] h-[40px] flex justify-center items-center rounded-md font-bold">
              <Image alt="twinkle" src="/twinkle.svg" height={20} width={20} className="mr-3" />
              <span>AI 생성 생성하기</span>
            </div>
          ) : (
            <div className="bg-[#f1f0f0] w-[220px] h-[40px] flex justify-center items-center rounded-md font-bold">
              <Image alt="twinkle" src="/twinkle.svg" height={20} width={20} className="mr-3" />
              <span>AI 초안 생성하기</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
