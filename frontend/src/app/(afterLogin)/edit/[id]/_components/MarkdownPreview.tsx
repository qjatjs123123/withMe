import { useMarkdown } from '../_contexts/MarkdownContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';

export function MarkdownPreview() {
  const { markdowns } = useMarkdown();

  return (
    <div className="markdown-body">
      {markdowns?.map((markdown) => (
        <ReactMarkdown key={markdown.id} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
          {markdown.content}
        </ReactMarkdown>
      ))}
    </div>
  );
}
