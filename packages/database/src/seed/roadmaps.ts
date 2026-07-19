import { db } from "../client";
import { concepts, roadmaps, students } from "../schema";

export async function seedRoadmaps() {
  const allStudents = await db.select().from(students);
  const allConcepts = await db.select().from(concepts);

  const conceptMap = new Map(
    allConcepts.map((concept) => [concept.title, concept.id]),
  );

  const values = allStudents
    .map((student) => {
      const isAlice = student.email === "alice@example.com";

      const currentConcept = isAlice
        ? "Fractions"
        : "Factors";

      const nextConcepts = isAlice
        ? [
            "Equivalent Fractions",
            "Comparing Fractions",
            "Addition of Fractions",
          ]
        : [
            "Multiples",
            "Prime Numbers",
            "Fractions",
          ];

      const currentConceptId = conceptMap.get(currentConcept);

      if (!currentConceptId) {
        console.warn(`Missing concept: ${currentConcept}`);
        return null;
      }

      const nextConceptIds = nextConcepts
        .map((title) => conceptMap.get(title))
        .filter((id): id is string => id !== undefined);

      return {
        studentId: student.id,
        currentConceptId,
        nextConceptIds,
      };
    })
    .filter(
      (
        roadmap,
      ): roadmap is {
        studentId: string;
        currentConceptId: string;
        nextConceptIds: string[];
      } => roadmap !== null,
    );

  await db
    .insert(roadmaps)
    .values(values)
    .onConflictDoNothing();
}