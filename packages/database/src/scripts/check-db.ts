// packages/database/scripts/check-db.ts

import { config } from "dotenv";
import { resolve } from "node:path";
import postgres from "postgres";

config({
  path: resolve(process.cwd(), "../../.env"),
});

const sql = postgres(process.env.DATABASE_URL!);

const tables = await sql`
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public'
ORDER BY table_name;
`;

console.log(tables);

await sql.end();