import { db } from "../client";
import { students } from "../schema";

export async function seedStudents() {
  await db.insert(students).values([
    {
      email: "alice@example.com",
      name: "Alice Johnson",
      grade: 6,
    },
    {
      email: "bob@example.com",
      name: "Bob Smith",
      grade: 6,
    },
  ]).onConflictDoNothing();
}