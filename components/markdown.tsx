import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { HeadingLink } from './heading-link';
import { ReactNode } from 'react';
import { Alert } from './alert';
import { YouTubeEmbed } from './youtube';

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
          code: ({ children }: any) => {
            if (typeof children === 'string') {
              if (children.startsWith('youtube:')) {
                return (
                  <YouTubeEmbed url={children.replace('youtube:', '').trim()} />
                );
              }
              if (children.startsWith('alert:')) {
                const alert = children.replace('alert:', '').trim();
                const type = alert.split(':')[0].split('=')[1];
                const message = alert.split(':').slice(1).join(':').trim();
                return <Alert type={type} message={message} />;
              }
            }
            return <code>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
