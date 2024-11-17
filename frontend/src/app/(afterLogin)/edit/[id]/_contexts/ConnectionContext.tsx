// ../edit/[id]/_contexts/ConnectionContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ConnectionContextType {
  rooms: Set<string>;
  isRoomConnected: (roomId: string) => boolean;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

interface ConnectionProviderProps {
  children: ReactNode;
}

export function ConnectionProvider({ children }: ConnectionProviderProps): JSX.Element {
  const [rooms, setRooms] = useState<Set<string>>(new Set());

  const isRoomConnected = (roomId: string) => {
    return rooms.has(roomId);
  };

  return <ConnectionContext.Provider value={{ rooms, isRoomConnected }}>{children}</ConnectionContext.Provider>;
}

export function useConnection(): ConnectionContextType {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}
