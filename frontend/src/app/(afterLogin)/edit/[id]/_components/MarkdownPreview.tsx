import { useMarkdown } from '../_contexts/MarkdownContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';
import { useMenuItems } from '../_contexts/MenuItemsContext';

export function MarkdownPreview() {
  const { markdowns } = useMarkdown();
  const { menuItems } = useMenuItems();

  return (
    <div>
      {markdowns?.map((markdown) => {
        const menuItem = menuItems.find((menu) => menu.id === markdown.id);
        const label = menuItem?.label ?? '';
        return (
          <div key={markdown.id} className="relative mb-8">
            <div className="markdown-body">
              <ReactMarkdown key={markdown.id} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
                {markdown.content}
              </ReactMarkdown>
            </div>
            <div
              className="text-[16px] w-full flex justify-end"
              style={{ fontFamily: 'samsungsharpsans-bold, SamsungOneKorean-700' }}
            >
              <div className="w-30 border-t-2 flex justify-end">{label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
