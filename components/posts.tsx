'use client';

import { allPosts } from 'content-collections';
import { Post } from '@/components/post';

export function Posts({ likes }: { likes: { slug: string }[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allPosts.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
        />
      ))}
    </ul>
  );
}
