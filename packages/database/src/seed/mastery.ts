import { db } from "../client";
import { concepts, studentMastery, students } from "../schema";

export async function seedMastery() {
  const allStudents = await db.select().from(students);
  const allConcepts = await db.select().from(concepts);

  const values = [];

  for (const student of allStudents) {
    const isAlice = student.email === "alice@example.com";

    for (const concept of allConcepts) {
      let mastery = 50;

      switch (concept.title) {
        case "Whole Numbers":
          mastery = isAlice ? 95 : 60;
          break;

        case "Comparing Whole Numbers":
          mastery = isAlice ? 92 : 55;
          break;

        case "Place Value":
          mastery = isAlice ? 90 : 50;
          break;

        case "Factors":
          mastery = isAlice ? 88 : 45;
          break;

        case "Multiples":
          mastery = isAlice ? 85 : 42;
          break;

        case "Prime Numbers":
          mastery = isAlice ? 82 : 40;
          break;

        case "Integers":
          mastery = isAlice ? 78 : 38;
          break;

        case "Ordering Integers":
          mastery = isAlice ? 75 : 35;
          break;

        case "Fractions":
          mastery = isAlice ? 72 : 32;
          break;

        case "Equivalent Fractions":
          mastery = isAlice ? 65 : 25;
          break;

        case "Comparing Fractions":
          mastery = isAlice ? 60 : 22;
          break;

        case "Addition of Fractions":
          mastery = isAlice ? 55 : 18;
          break;

        case "Decimals":
          mastery = isAlice ? 52 : 15;
          break;

        case "Comparing Decimals":
          mastery = isAlice ? 48 : 12;
          break;

        case "Ratio":
          mastery = isAlice ? 42 : 10;
          break;

        case "Proportion":
          mastery = isAlice ? 38 : 8;
          break;

        case "Variables":
          mastery = isAlice ? 35 : 8;
          break;

        case "Simple Equations":
          mastery = isAlice ? 30 : 5;
          break;

        case "Lines and Angles":
          mastery = isAlice ? 45 : 25;
          break;

        case "Triangles":
          mastery = isAlice ? 40 : 20;
          break;

        case "Perimeter":
          mastery = isAlice ? 35 : 18;
          break;

        case "Area":
          mastery = isAlice ? 30 : 15;
          break;

        case "Data Collection":
          mastery = isAlice ? 55 : 35;
          break;

        case "Bar Graphs":
          mastery = isAlice ? 50 : 30;
          break;
      }

      values.push({
        studentId: student.id,
        conceptId: concept.id,
        mastery,
        confidence: 80,
        attempts: 0,
      });
    }
  }

  await db
    .insert(studentMastery)
    .values(values)
    .onConflictDoNothing();
}