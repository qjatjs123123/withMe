// .../edit/_contexts/AIDraftContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  text: string;
}

interface AIDraftContextProps {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const AIDraftContext = createContext<AIDraftContextProps | undefined>(undefined);

export const AIDraftProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return <AIDraftContext.Provider value={{ messages, addMessage }}>{children}</AIDraftContext.Provider>;
};

export const useAIDraft = () => {
  const context = useContext(AIDraftContext);
  if (!context) {
    throw new Error('useAIDraft must be used within an AIDraftProvider');
  }
  return context;
};
