import React, { createContext, useRef, ReactNode, useContext, useState } from 'react';

// 전역 상태 타입 정의

// 기본값을 설정
const GlobalStateContext = createContext(undefined);

// Context Provider 컴포넌트
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const curRepo = useRef(''); // useRef로 관리
  const [isModalOpen, setModalOpen] = useState(false);

  const setCurRepo = (repo) => {
    curRepo.current = repo; // 값 설정
  };

  return (
    <GlobalStateContext.Provider value={{ curRepo, setCurRepo, isModalOpen, setModalOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
