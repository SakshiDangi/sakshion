import { db } from "../client";

export async function transaction<T>(
  callback: Parameters<typeof db.transaction>[0],
): Promise<T> {
  return db.transaction(callback) as Promise<T>;
}