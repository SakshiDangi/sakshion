import { timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Standard UUID primary key.
 */
export const id = () =>
  uuid("id").defaultRandom().primaryKey();

/**
 * Standard timestamps.
 */
export const timestamps = {
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
};