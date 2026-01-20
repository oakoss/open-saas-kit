import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const verifications = pgTable(
  'verification',
  {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    value: text('value').notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
);

export type Verification = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;
