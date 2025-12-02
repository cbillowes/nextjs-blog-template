'use client';

import { Post as PostType } from '@/.content-collections/generated';
import { Post } from '@/components/post';
import { Like } from '@/db/schema';
import { useState } from 'react';

export function Posts({
  posts,
  likes,
  filterOnChange,
}: {
  posts: PostType[];
  likes: Like[];
  filterOnChange?: boolean;
}) {
  const [data, setData] = useState(posts);

  const onUnlike = (slug: string) => {
    if (!filterOnChange) return;
    setData((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-2">
      {data.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
          onUnlike={onUnlike}
        />
      ))}
    </div>
  );
}
