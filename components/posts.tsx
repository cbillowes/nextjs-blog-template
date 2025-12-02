'use client';

import { Post as PostType } from '@/.content-collections/generated';
import { Post } from '@/components/post';
import { Like } from '@/db/schema';

export function Posts({ posts, likes }: { posts: PostType[]; likes: Like[] }) {
  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-2">
      {posts.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
        />
      ))}
    </div>
  );
}
