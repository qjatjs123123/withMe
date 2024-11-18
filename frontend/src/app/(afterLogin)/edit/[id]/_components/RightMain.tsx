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
  const [activeView, setActiveView] = useState('preview');

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

  return (
    <div className="flex flex-col h-full justify-start items-center bg-white">
      <div
        className="flex w-full px-6 items-center justify-between mb-2"
        style={{ fontFamily: 'samsungsharpsans-bold' }}
      >
        <div className="flex-1" /> {/* Spacer */}
        <div className="flex items-center justify-center space-x-8 text-xl">
          <button
            onClick={() => setActiveView('preview')}
            className={`h-8 focus:outline-none ${activeView === 'preview' ? 'border-b-2 border-black' : ''}`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveView('markdown')}
            className={`h-8 focus:outline-none ${activeView === 'markdown' ? 'border-b-2 border-black' : ''}`}
          >
            MarkDown
          </button>
          <button
            onClick={() => setActiveView('ai')}
            className={`h-8 focus:outline-none ${activeView === 'ai' ? 'border-b-2 border-black' : ''}`}
          >
            AI
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          <Gauge connection={connection} />
        </div>
      </div>

      <div className="text-[20px] w-full h-[90%] bg-white edit-scrollbar" style={{ fontFamily: 'sans-serif' }}>
        <AIDraftProvider>
          {activeView === 'preview' && (
            <div className="w-[90%] mx-auto h-full ">
              <MarkdownPreview />
            </div>
          )}
          {activeView === 'markdown' && (
            <div className="w-[90%] mx-auto h-full ">
              <MarkdownView />
            </div>
          )}
          {activeView === 'ai' && (
            <div className="w-full mt-4 mb-12 flex justify-center overflow-x-hidden">
              <AIDraft />
            </div>
          )}
        </AIDraftProvider>
      </div>
    </div>
  );
}
