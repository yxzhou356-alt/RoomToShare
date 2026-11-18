import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const entries = sqliteTable('entries', {
 id: text('id').primaryKey(), userId: text('user_id').notNull(), kind: text('kind').notNull(),
 date: text('date').notNull(), content: text('content').notNull().default(''),
 opinion: text('opinion').notNull().default(''), feelings: text('feelings').notNull().default('[]'),
 status: text('status').notNull().default('private'), context: text('context').notNull().default(''),
 createdAt: text('created_at').notNull(), updatedAt: text('updated_at').notNull(),
}, t => [index('entries_user_date_idx').on(t.userId, t.date)]);
