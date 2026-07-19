import { config } from "dotenv";
import { resolve } from "node:path";

config({
  path: resolve(process.cwd(), "../../.env"),
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export const DATABASE_URL: string = databaseUrl;