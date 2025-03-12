import { pgTable, serial, text, integer, timestamp, uuid, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    googleId: text('google_id').unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});