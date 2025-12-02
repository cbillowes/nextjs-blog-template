'use client';

import { Post as PostType } from '@/.content-collections/generated';
import { Post } from '@/components/post';
import { Like } from '@/db/schema';

export function Posts({ posts, likes }: { posts: PostType[]; likes: Like[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
        />
      ))}
    </ul>
  );
}
