'use client';

import { createContext, useContext, useState } from 'react';

type ActiveIdContextType = {
  activeId: string | null;
  setActiveId: (id: string) => void;
};

const ActiveIdContext = createContext<ActiveIdContextType | undefined>(undefined);

export function ActiveIdProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return <ActiveIdContext.Provider value={{ activeId, setActiveId }}>{children}</ActiveIdContext.Provider>;
}

export function useActiveId() {
  const context = useContext(ActiveIdContext);
  if (context === undefined) {
    throw new Error('useActiveId must be used within an ActiveIdProvider');
  }
  return context;
}
