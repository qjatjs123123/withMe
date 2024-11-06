import { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useActiveId } from '../_contexts/ActiveIdContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';

export function AIDraft() {
  const { activeId } = useActiveId();
  const { menuItems } = useMenuItems();
  const [activeLabel, setActiveLabel] = useState<string>();
  const [promptValue, setPromptValue] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [accumulatedContent, setAccumulatedContent] = useState<string>('');

  useEffect(() => {
    const activeMenuItem = menuItems.find((item) => item.id === activeId);
    setActiveLabel(activeMenuItem ? activeMenuItem.label : '');
  }, [menuItems, activeId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!promptValue) return;

    setMessages((prev) => [...prev, { text: promptValue, isUser: true }]);
    setPromptValue('');
    startStreamingResponse();
  };

  const startStreamingResponse = async () => {
    setIsStreaming(true);
    setAccumulatedContent('');

    try {
      const response = await fetch('http://k11a507.p.ssafy.io:4040/api/readme/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({
          repository_url: 'git-practice',
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
            const jsonString = line.slice(5).trim(); // "data:" 접두사 제거
            console.log('Parsed JSON string:', jsonString); // JSON 문자열 확인

            try {
              const jsonData = JSON.parse(jsonString);

              // content가 존재하는 경우에만 처리
              if (jsonData.choices && jsonData.choices[0].delta.content) {
                const content = jsonData.choices[0].delta.content;
                console.log('Received content:', content); // content 출력

                // messages 배열에 content 추가 (예: React 상태를 업데이트할 때)
                setAccumulatedContent((prevContent) => prevContent + content);
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
      event.preventDefault(); // Prevent input while streaming
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="text-lg font-semibold mb-4">현재 목차: {activeLabel}</div>
      <div className="flex-grow rounded-lg p-4 overflow-auto">
        {messages.map((message, idx) => (
          <div key={idx} className={`mb-2 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg ${message.isUser ? 'bg-gray-200' : 'bg-transparent'} max-w-[80%]`}>
              {message.text}
            </div>
          </div>
        ))}
        {<div className="p-2 text-left text-gray-700">{accumulatedContent}</div>}
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
