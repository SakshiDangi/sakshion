import {
  pgTable,
  text,
  integer,
} from "drizzle-orm/pg-core";

import { id, timestamps } from "./common";

export const concepts = pgTable("concepts", {
  id: id(),

  subject: text("subject").notNull(),

  grade: integer("grade").notNull(),

  title: text("title").notNull(),

  description: text("description"),

  difficulty: integer("difficulty").notNull().default(1),

  ...timestamps,
});