import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { id } from "./common";
import { students } from "./student";

export const learningEvents = pgTable("learning_events", {
  id: id(),

  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, {
      onDelete: "cascade",
    }),

  eventType: text("event_type").notNull(),

  payload: jsonb("payload")
    .$type<Record<string, unknown>>()
    .notNull(),

  previousHash: text("previous_hash"),

  hash: text("hash").notNull(),

  signature: text("signature").notNull(),

  verified: boolean("verified")
    .notNull()
    .default(false),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});