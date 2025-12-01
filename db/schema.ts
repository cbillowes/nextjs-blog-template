import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const likes = pgTable('likes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
});
