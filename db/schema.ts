import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export type Like = {
  id: number;
  userId: string;
  slug: string;
};

export const likes = pgTable('likes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
});
