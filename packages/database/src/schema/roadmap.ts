import {
  jsonb,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { students } from "./student";
import { concepts } from "./concept";

export const roadmaps = pgTable("roadmaps", {
  studentId: uuid("student_id")
    .primaryKey()
    .references(() => students.id, {
      onDelete: "cascade",
    }),

  currentConceptId: uuid("current_concept_id")
    .references(() => concepts.id, {
      onDelete: "set null",
    }),

  nextConceptIds: jsonb("next_concept_ids")
    .$type<string[]>()
    .notNull()
    .default([]),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});