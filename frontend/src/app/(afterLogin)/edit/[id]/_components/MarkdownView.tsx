import React, { useEffect } from 'react';
import { useMarkdown } from '../_contexts/MarkdownContext';


export function MarkdownView() {
  const { markdowns, setMarkdowns } = useMarkdown();

  return (
    <div className="space-y-4 p-3">
      {markdowns &&
        markdowns.map((markdown) => (
          <div key={markdown.id} className="prose max-w-none">
            <div className="whitespace-pre-wrap">{markdown.content}</div>
          </div>
        ))}
    </div>
  );
}
