import React, { useState } from 'react';
import { MarkdownView } from './MarkdownView';
import { AIDraft } from './AIDraft';
import { MarkdownPreview } from './MarkdownPreview';
import { AIDraftProvider } from '../_contexts/AIDraftContext';

export default function RightMain() {
  const [activeView, setActiveView] = useState<'markdown' | 'preview' | 'ai'>('preview');

  const handleViewChange = (view: 'markdown' | 'preview' | 'ai') => {
    setActiveView(view);
  };

  return (
    <div className="flex flex-col h-full items-center bg-white">
      <div className="flex items-center justify-center my-5 w-[300px] h-[40px] bg-[#495365] text-white rounded-[90px]">
        <button
          onClick={() => handleViewChange('preview')}
          className={`px-5 mx-1 border-none cursor-pointer rounded-[90px] h-[30px] ${activeView === 'preview' ? 'bg-[#49DCB0] text-black' : 'bg-[#3D424A] text-white'}`}
        >
          Preview
        </button>
        <button
          onClick={() => handleViewChange('markdown')}
          className={`px-5 mx-1  border-none cursor-pointer rounded-[90px] h-[30px] ${activeView === 'markdown' ? 'bg-[#49DCB0] text-black' : 'bg-[#3D424A] text-white'}`}
        >
          MarkDown
        </button>
        <button
          onClick={() => handleViewChange('ai')}
          className={`px-5 mx-1  border-none cursor-pointer rounded-[90px] h-[30px] ${activeView === 'ai' ? 'bg-[#49DCB0] text-black' : 'bg-[#3D424A] text-white'}`}
        >
          AI
        </button>
      </div>
      <div className="mt-5 text-[20px] w-full h-[90%] p-7 bg-white overflow-x-auto overflow-y-scroll">
        <AIDraftProvider>
          {activeView === 'preview' && <MarkdownPreview />}
          {activeView === 'markdown' && <MarkdownView />}
          {activeView === 'ai' && <AIDraft />}
        </AIDraftProvider>
      </div>
    </div>
  );
}
