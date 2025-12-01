import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { HeadingLink } from './heading-link';
import { ReactNode } from 'react';

export function Markdown({ id, content }: { id: string; content: string }) {
  function getHeadingId(children: string | ReactNode) {
    return typeof children === 'string'
      ? children.replace(/\s+/g, '-').toLowerCase()
      : '';
  }

  return (
    <div id={id}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ children }) => {
            const id = getHeadingId(children);
            return (
              <HeadingLink id={id}>
                <h2>{children}</h2>
              </HeadingLink>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
