import { randomUUID } from "node:crypto";

import { db } from "../client";
import { learningEvents, students } from "../schema";

export async function seedLearningEvents() {
  const allStudents = await db.select().from(students);

  const values = [];

  for (const student of allStudents) {
    const isAlice = student.email === "alice@example.com";

    const diagnosticId = randomUUID();
    const practiceId = randomUUID();
    const masteryId = randomUUID();

    values.push(
      {
        studentId: student.id,
        eventType: "diagnostic.completed",
        payload: {
          score: isAlice ? 82 : 48,
        },
        previousHash: null,
        hash: `seed-hash-${diagnosticId}`,
        signature: `seed-signature-${diagnosticId}`,
        verified: true,
      },
      {
        studentId: student.id,
        eventType: "practice.completed",
        payload: {
          concept: isAlice ? "Fractions" : "Factors",
          score: isAlice ? 91 : 62,
        },
        previousHash: `seed-hash-${diagnosticId}`,
        hash: `seed-hash-${practiceId}`,
        signature: `seed-signature-${practiceId}`,
        verified: true,
      },
      {
        studentId: student.id,
        eventType: "mastery.updated",
        payload: {
          before: isAlice ? 72 : 45,
          after: isAlice ? 81 : 56,
        },
        previousHash: `seed-hash-${practiceId}`,
        hash: `seed-hash-${masteryId}`,
        signature: `seed-signature-${masteryId}`,
        verified: true,
      },
    );

    if (isAlice) {
      values.push({
        studentId: student.id,
        eventType: "roadmap.updated",
        payload: {
          currentConcept: "Equivalent Fractions",
        },
        previousHash: `seed-hash-${masteryId}`,
        hash: `seed-hash-roadmap-${student.id}`,
        signature: `seed-signature-roadmap-${student.id}`,
        verified: true,
      });
    }
  }

  await db
    .insert(learningEvents)
    .values(values)
    .onConflictDoNothing();
}