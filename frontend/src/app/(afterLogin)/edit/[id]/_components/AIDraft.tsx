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

  useEffect(() => {
    const activeMenuItem = menuItems.find((item) => item.id === activeId);
    setActiveLabel(activeMenuItem ? activeMenuItem.label : '');
  }, [menuItems, activeId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(event.target.value);
  };

  const mockResponse = 'This is a simulated streaming response from the GPT mockup.';

  const handleSubmit = () => {
    if (!promptValue) return;

    setMessages((prev) => [...prev, { text: promptValue, isUser: true }]);
    setPromptValue('');

    startStreamingResponse(mockResponse);
  };

  const startStreamingResponse = (responseText: string) => {
    setIsStreaming(true);
    let index = -1;

    const intervalId = setInterval(() => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (!lastMessage || lastMessage.isUser) {
          return [...prev, { text: responseText.charAt(index), isUser: false }];
        } else {
          const updatedText = lastMessage.text + responseText.charAt(index);
          return [...prev.slice(0, -1), { text: updatedText, isUser: false }];
        }
      });

      index += 1;

      if (index >= responseText.length) {
        clearInterval(intervalId);
        setIsStreaming(false);
      }
    }, 50);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isStreaming) {
      event.preventDefault(); // Prevent input while streaming
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      handleSubmit();
    }
  };

  useEffect(() => {});
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
        {/* {isStreaming && <div className="p-2 text-left">...</div>} */}
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
          <FaArrowCircleUp size={40} />
        </button>
      </div>
    </div>
  );
}
