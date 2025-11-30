import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'data/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.date(),
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
    return {
      ...doc,
      prev: idx > 0 ? docs[idx - 1] : null,
      next: idx < docs.length - 1 ? docs[idx + 1] : null,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
