import { useMarkdown } from '../_contexts/MarkdownContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';
import { useConnection } from '../_contexts/ConnectionContext';
import { Loading } from './Loading';

export function MarkdownPreview() {
  const { markdowns } = useMarkdown();
  const connection = useConnection();

  return connection.rooms.size < 10 ? (
    <div className="relative w-full h-full">
      {/* Loading 컴포넌트를 부모 요소 중앙에 고정 */}
      <div className="absolute inset-0 flex justify-center items-center z-10 top-[-100px]">
        <Loading />
      </div>
      <div className="markdown-body">
        {markdowns?.map((markdown) => (
          <ReactMarkdown key={markdown.id} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
            {markdown.content}
          </ReactMarkdown>
        ))}
      </div>
    </div>
  ) : (
    <div className="markdown-body">
      {markdowns?.map((markdown) => (
        <ReactMarkdown key={markdown.id} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
          {markdown.content}
        </ReactMarkdown>
      ))}
    </div>
  );
}
