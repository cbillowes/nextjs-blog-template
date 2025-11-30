import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

function slugify(filePath: string, title: string) {
  const [year, month, day] = filePath.split('-');
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `/blog/${year}/${month}/${day}/${slug}`;
}

const posts = defineCollection({
  name: 'posts',
  directory: 'data/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    hero: z.string().optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string(),
    content: z.string(),
  }),
  transform: async (doc, { collection }) => {
    const docs = (await collection.documents()).sort((a, b) =>
      a._meta.fileName.localeCompare(b._meta.fileName),
    );
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    const prev = idx > 0 ? docs[idx - 1] : null;
    const next = idx < docs.length - 1 ? docs[idx + 1] : null;
    return {
      ...doc,
      slug: slugify(doc._meta.fileName, doc.title),
      prev: prev ? { ...prev, slug: slugify(prev._meta.filePath, prev.title) } : null,
      next: next ? { ...next, slug: slugify(next._meta.filePath, next.title) } : null,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
