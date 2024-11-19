'use client';

import { createContext, useContext, useState } from 'react';
import { MenuItem } from '../_types/MenuItem';

type MenuItemsContextType = {
  initialItems: MenuItem[] | null;
  setInitialItems: (items: MenuItem[] | null) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
};

const MenuItemsContext = createContext<MenuItemsContextType | undefined>(undefined);

export function MenuItemsProvider({ children }: { children: React.ReactNode }) {
  const [initialItems, setInitialItems] = useState<MenuItem[] | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <MenuItemsContext.Provider
      value={{
        initialItems,
        setInitialItems,
        menuItems,
        setMenuItems,
      }}
    >
      {children}
    </MenuItemsContext.Provider>
  );
}

export function useMenuItems() {
  const context = useContext(MenuItemsContext);
  if (context === undefined) {
    throw new Error('useMenuItems must be used within a MenuItemsProvider');
  }
  return context;
}
