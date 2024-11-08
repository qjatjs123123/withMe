import React, { createContext, useRef, ReactNode, useContext, useState } from 'react';

// 전역 상태 타입 정의

// 기본값을 설정
const WorkspaceStateContext = createContext(undefined);

// Context Provider 컴포넌트
export const WorkspaceStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const curWorkspace = useRef(''); // useRef로 관리

  const setWorkspace = (workspace) => {
    curWorkspace.current = workspace; // 값 설정
  };

  return (
    <WorkspaceStateContext.Provider value={{ curWorkspace, setWorkspace }}>{children}</WorkspaceStateContext.Provider>
  );
};

export const useWorkspaceState = () => {
  const context = useContext(WorkspaceStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
