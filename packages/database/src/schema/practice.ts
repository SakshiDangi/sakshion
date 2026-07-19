import {
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { id } from "./common";
import { students } from "./student";
import { concepts } from "./concept";

export const practiceAttempts = pgTable("practice_attempts", {
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

  score: integer("score")
    .notNull(),

  masteryBefore: integer("mastery_before")
    .notNull(),

  masteryAfter: integer("mastery_after")
    .notNull(),

  completedAt: timestamp("completed_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});