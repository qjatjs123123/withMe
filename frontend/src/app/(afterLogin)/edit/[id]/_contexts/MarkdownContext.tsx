'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Markdown } from '../_types/Markdown';
import { useConnection } from './ConnectionContext';
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
  const { rooms } = useConnection();
  const [markdowns, setMarkdowns] = useState<Markdown[] | null>([]);
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();
  const lastSavedContentRef = useRef<string>('');

  const getAllMarkdowns = useCallback(() => {
    if (!markdowns) return '';
    return markdowns.map((markdown) => markdown.content).join('\n');
  }, [markdowns]);

  const saveMarkdowns = useCallback(async () => {
    if (!markdowns || isSaving || rooms.size != 10) return;

    const currentContent = getAllMarkdowns();
    // 내용이 변경되지 않았다면 저장하지 않음
    if (currentContent === lastSavedContentRef.current) {
      return;
    }

    setIsSaving(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.SAVE_README}`, {
        workspace_id: params.id,
        readme_content: currentContent,
      });
      lastSavedContentRef.current = currentContent;
      console.log('Markdown saved successfully');
    } catch (error) {
      console.error('Failed to save README:', error);
    } finally {
      setIsSaving(false);
    }
  }, [markdowns, getAllMarkdowns, params.id, isSaving]);

  // 마크다운 내용이 변경될 때마다 저장 실행
  useEffect(() => {
    if (markdowns) {
      saveMarkdowns();
    }
  }, [markdowns, saveMarkdowns]);

  // 페이지 언로드 전 저장
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      const currentContent = getAllMarkdowns();
      if (currentContent !== lastSavedContentRef.current) {
        e.preventDefault();
        e.returnValue = '';

        try {
          await saveMarkdowns();
        } catch (error) {
          console.error('Failed to save before unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // 컴포넌트 언마운트 시 마지막으로 한 번 저장
      saveMarkdowns();
    };
  }, [saveMarkdowns, getAllMarkdowns]);

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
