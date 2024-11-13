import React, { useEffect, useState } from 'react';
import { MarkdownView } from './MarkdownView';
import { AIDraft } from './AIDraft';
import { MarkdownPreview } from './MarkdownPreview';
import { AIDraftProvider } from '../_contexts/AIDraftContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';
import { useMarkdown } from '../_contexts/MarkdownContext';
import { useConnection } from '../_contexts/ConnectionContext';
import Gauge from './Gauge';

export default function RightMain() {
  const { menuItems } = useMenuItems();
  const { markdowns, setMarkdowns } = useMarkdown();
  const connection = useConnection();

  useEffect(() => {
    if (!menuItems) return;

    if (!markdowns) {
      const emptyMarkdowns = menuItems.map((menuItem) => ({
        id: menuItem.id,
        content: '',
      }));
      setMarkdowns(emptyMarkdowns);
    }

    const sortedMarkdowns = menuItems.map((menuItem) => {
      return (
        markdowns.find((md) => md.id === menuItem.id) || {
          id: menuItem.id,
          content: '',
        }
      );
    });
    setMarkdowns(sortedMarkdowns);
  }, [menuItems]);

  const [activeView, setActiveView] = useState<'markdown' | 'preview' | 'ai'>('preview');

  const handleViewChange = (view: 'markdown' | 'preview' | 'ai') => {
    setActiveView(view);
  };

  return (
    <div
      className="flex flex-col h-full justify-start items-center bg-white"
      style={{ fontFamily: 'samsungsharpsans-bold' }}
    >
      <div className="flex items-center justify-center  w-[300px] h-[40px] text-black rounded-[90px]">
        <button
          onClick={() => handleViewChange('preview')}
          className={`mx-4 my-2 cursor-pointer h-[30px] hover:border-b-2 hover:border-black ${activeView === 'preview' ? 'border-b-2 border-black' : ''}`}
        >
          Preview
        </button>
        <button
          onClick={() => handleViewChange('markdown')}
          className={`mx-4 my-2 cursor-pointer h-[30px] hover:border-b-2 hover:border-black ${activeView === 'markdown' ? 'border-b-2 border-black' : ''}`}
        >
          MarkDown
        </button>
        <button
          onClick={() => handleViewChange('ai')}
          className={`mx-4 my-2 cursor-pointer h-[30px] hover:border-b-2 hover:border-black ${activeView === 'ai' ? 'border-b-2 border-black' : ''}`}
        >
          AI
        </button>
      </div>

      <div className="w-[200px]">
        <Gauge connection={connection} />
      </div>

      <div className="text-[20px] w-full h-[90%] p-7 bg-white overflow-x-auto overflow-y-scroll">
        <AIDraftProvider>
          {activeView === 'preview' && <MarkdownPreview />}
          {activeView === 'markdown' && <MarkdownView />}
          {activeView === 'ai' && <AIDraft />}
        </AIDraftProvider>
      </div>
    </div>
  );
}
