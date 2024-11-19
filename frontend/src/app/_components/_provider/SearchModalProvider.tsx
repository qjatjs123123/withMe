import React, { createContext, useRef, ReactNode, useContext, useState, useEffect } from 'react';

const SearchModalStateContext = createContext(undefined);

export const SearchModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedKeyword, setselectedKeyword] = useState([]);

  return (
    <SearchModalStateContext.Provider value={{ selectedKeyword, setselectedKeyword }}>
      {children}
    </SearchModalStateContext.Provider>
  );
};

export const useSearchModalState = () => {
  const context = useContext(SearchModalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
