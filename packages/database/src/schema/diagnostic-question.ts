import {
  integer,
  jsonb,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { id, timestamps } from "./common";
import { concepts } from "./concept";

export const diagnosticQuestions = pgTable(
  "diagnostic_questions",
  {
    id: id(),

    conceptId: uuid("concept_id")
      .notNull()
      .references(() => concepts.id, {
        onDelete: "cascade",
      }),

    question: text("question").notNull(),

    options: jsonb("options")
      .$type<string[]>()
      .notNull(),

    answer: text("answer").notNull(),

    explanation: text("explanation"),

    difficulty: integer("difficulty")
      .notNull()
      .default(1),

    ...timestamps,
  }
);