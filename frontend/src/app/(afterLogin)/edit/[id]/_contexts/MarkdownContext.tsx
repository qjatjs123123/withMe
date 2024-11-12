'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Markdown } from '../_types/Markdown';
import axios from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';
import { useParams } from 'next/navigation';

type MarkdownContextType = {
  markdowns: Markdown[] | null;
  setMarkdowns: (items: Markdown[] | null) => void;
  saveMarkdowns: () => Promise<void>;
  getAllMarkdowns: () => string;
};

const MarkdownContext = createContext<MarkdownContextType | undefined>(undefined);

export function MarkdownProvider({ children }: { children: React.ReactNode }) {
  const [markdowns, setMarkdowns] = useState<Markdown[] | null>([]);
  const params = useParams();

  // 마크다운 내용을 합치는 함수
  const getAllMarkdowns = useCallback(() => {
    if (!markdowns) return '';
    return markdowns.map((markdown) => markdown.content).join('\n');
  }, [markdowns]);

  // useCallback으로 메모이제이션
  const saveMarkdowns = useCallback(async () => {
    if (markdowns) {
      const combinedContent = getAllMarkdowns();
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.SAVE_README}`, {
          workspace_id: params.id,
          readme_content: combinedContent,
        });
      } catch (error) {
        console.error('Failed to save README:', error);
      }
    }
  }, [markdowns, getAllMarkdowns]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (markdowns) {
        saveMarkdowns();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [markdowns, saveMarkdowns]);

  return (
    <MarkdownContext.Provider
      value={{
        markdowns,
        setMarkdowns,
        saveMarkdowns,
        getAllMarkdowns,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
}

export function useMarkdown() {
  const context = useContext(MarkdownContext);
  if (context === undefined) {
    throw new Error('useMarkdown must be used within a MarkdownProvider');
  }
  return context;
}
