import { DATABASE_URL } from "../env";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export const sql = postgres(DATABASE_URL, {
  prepare: false,
});

export const db = drizzle({
  client: sql,
});