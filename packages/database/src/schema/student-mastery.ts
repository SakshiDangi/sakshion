import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { students } from "./student";
import { concepts } from "./concept";

export const studentMastery = pgTable(
  "student_mastery",
  {
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

    mastery: integer("mastery")
      .notNull()
      .default(0),

    confidence: integer("confidence")
      .notNull()
      .default(0),

    attempts: integer("attempts")
      .notNull()
      .default(0),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.studentId, table.conceptId],
    }),
  })
);