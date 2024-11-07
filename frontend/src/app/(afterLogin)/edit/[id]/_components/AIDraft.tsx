import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useActiveId } from '../_contexts/ActiveIdContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';
import { useAIDraft } from '../_contexts/AIDraftContext';

export function AIDraft() {
  const { activeId } = useActiveId();
  const { menuItems } = useMenuItems();
  const { messages, addMessage } = useAIDraft();
  const [activeLabel, setActiveLabel] = useState<string>();
  const [promptValue, setPromptValue] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [accumulatedContent, setAccumulatedContent] = useState<string>('');

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

  const getCookieValue = (name: string) => {
    const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return matches ? decodeURIComponent(matches[2]) : null;
  };

  const userDataCookie = getCookieValue('userData');
  const userData = JSON.parse(userDataCookie as string);

  const startStreamingResponse = async () => {
    setIsStreaming(true);
    setAccumulatedContent('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/readme/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.access_token}`,
        },
        body: JSON.stringify({
          repository_url: 'Fit-Card-profile', // 수정 예정: 현재 선택된 레포명
          section_name: activeLabel,
          user_prompt: promptValue,
        }),
      });

      if (!response.body) throw new Error('ReadableStream not supported in this environment');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let isReading = true;

      while (isReading) {
        const { value, done } = await reader.read();
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

                setAccumulatedContent((prevContent) => {
                  const formattedContent = content.includes('\n') ? content.replace(/\n/g, '\n') : content;
                  return prevContent + formattedContent;
                });
              }
            } catch (error) {
              console.error('Failed to parse JSON chunk:', error);
            }
          }
        }
      }

      reader.releaseLock();
    } catch (error) {
      console.error('Error processing POST response stream:', error);
    } finally {
      setIsStreaming(false);
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
    <div className="flex flex-col w-full h-full p-2">
      <div className="text-lg font-semibold mb-4">현재 목차: {activeLabel}</div>
      <div className="flex-grow rounded-lg p-4 overflow-auto">
        {messages.map((message, idx) => (
          <div key={idx} className={`mb-2 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg ${message.isUser ? 'bg-gray-200' : 'bg-gray-50'} max-w-[80%]`}>
              {/* {message.text} */}
              {message.text.split('\n').map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        {accumulatedContent && (
          <div className={`mb-2 flex p-3 justify-start rounded-lg bg-gray-50 max-w-[80%]`}>
            {accumulatedContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <textarea
          value={promptValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="메시지 ChatGPT"
          className="w-full p-3 bg-[#F4F4F4] rounded-lg h-24 resize-none pr-20 focus:outline-none focus:border-none"
        />
        <button onClick={handleSubmit} className="absolute bottom-2 right-2 pb-2 rounded-full " disabled={isStreaming}>
          <FaArrowCircleUp size={32} />
        </button>
      </div>
    </div>
  );
}
