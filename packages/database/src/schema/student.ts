import {
  pgTable,
  text,
  integer,
} from "drizzle-orm/pg-core";

import { id, timestamps } from "./common";

export const students = pgTable("students", {
  id: id(),

  email: text("email")
    .notNull()
    .unique(),

  name: text("name")
    .notNull(),

  grade: integer("grade")
    .notNull(),

  avatar: text("avatar"),

  ...timestamps,
});