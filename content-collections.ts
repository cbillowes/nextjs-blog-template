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
});

export default defineConfig({
  collections: [posts],
});
