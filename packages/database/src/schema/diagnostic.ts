import {
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { id } from "./common";
import { students } from "./student";

export const diagnosticResults = pgTable("diagnostic_results", {
  id: id(),

  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, {
      onDelete: "cascade",
    }),

  score: integer("score")
    .notNull(),

  completedAt: timestamp("completed_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});