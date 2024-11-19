import React, { createContext, useRef, ReactNode, useContext, useState } from 'react';

// 전역 상태 타입 정의

// 기본값을 설정
const SnackBarStateContext = createContext(undefined);

// Context Provider 컴포넌트
export const SnackBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiState, useApiState] = useState({ message: '', state: false });

  return <SnackBarStateContext.Provider value={{ apiState, useApiState }}>{children}</SnackBarStateContext.Provider>;
};

export const useSnackBarState = () => {
  const context = useContext(SnackBarStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
