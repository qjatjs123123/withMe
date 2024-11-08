'use client';

import { createContext, useContext, useRef, useEffect } from 'react';
import { Editor } from '../_types/Editor';
import { useMenuItems } from './MenuItemsContext';

type EditorContextType = {
  editorsRef: React.MutableRefObject<Editor[] | null>;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const editorsRef = useRef<Editor[] | null>(null);
  const { menuItems } = useMenuItems();

  useEffect(() => {
    if (editorsRef !== null) {
      editorsRef.current = menuItems.map((menuItem) => ({
        id: menuItem.id,
        editor: null,
      }));
    }
  }, [menuItems]);

  return (
    <EditorContext.Provider
      value={{
        editorsRef,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return context;
}
