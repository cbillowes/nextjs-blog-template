import { ReactNode } from 'react';
import { BiLink } from 'react-icons/bi';

export function HeadingLink({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`#${id}`}
        className="ml-2 text-white"
        aria-label="Link to heading"
      >
        <BiLink className="text-white size-4" />
      </a>
      {children}
    </div>
  );
}
