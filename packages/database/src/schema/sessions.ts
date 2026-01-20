import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const sessions = pgTable(
  'session',
  {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    id: text('id').primaryKey(),
    ipAddress: text('ip_address'),
    token: text('token').notNull().unique(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)],
);

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
