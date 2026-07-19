// packages/database/scripts/test-db.ts

import { config } from "dotenv";
import { resolve } from "node:path";
import postgres from "postgres";

config({
  path: resolve(process.cwd(), "../../.env"),
});

const sql = postgres(process.env.DATABASE_URL!);

const result = await sql`
  SELECT current_database(), current_schema();
`;

console.log(result);

await sql.end();