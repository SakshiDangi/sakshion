import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { id } from "./common";
import { students } from "./student";
import { concepts } from "./concept";

export const tutorSessions = pgTable("tutor_sessions", {
  id: id(),

  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, {
      onDelete: "cascade",
    }),

  conceptId: uuid("concept_id")
    .notNull()
    .references(() => concepts.id, {
      onDelete: "cascade",
    }),

  prompt: text("prompt").notNull(),

  response: text("response").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});