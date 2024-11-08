import React, { useEffect } from 'react';
import { useMarkdown } from '../_contexts/MarkdownContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';

export function MarkdownView() {
  const { markdowns, setMarkdowns } = useMarkdown();
  const { menuItems } = useMenuItems();

  useEffect(() => {
    if (!menuItems) return;

    const emptyMarkdowns = menuItems.map((menuItem) => ({
      id: menuItem.id,
      content: '',
    }));

    if (!markdowns) {
      setMarkdowns(emptyMarkdowns);
    }
  }, []);

  useEffect(() => {
    if (!menuItems || !markdowns) return;

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
