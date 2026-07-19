import { db } from "../client";
import { conceptEdges, concepts } from "../schema";
import { eq } from "drizzle-orm";

const prerequisiteGraph: Array<[string, string]> = [
  // Whole Numbers
  ["Whole Numbers", "Comparing Whole Numbers"],
  ["Comparing Whole Numbers", "Place Value"],

  // Factors & Multiples
  ["Place Value", "Factors"],
  ["Factors", "Multiples"],
  ["Factors", "Prime Numbers"],

  // Integers
  ["Whole Numbers", "Integers"],
  ["Integers", "Ordering Integers"],

  // Fractions
  ["Factors", "Fractions"],
  ["Fractions", "Equivalent Fractions"],
  ["Equivalent Fractions", "Comparing Fractions"],
  ["Comparing Fractions", "Addition of Fractions"],

  // Decimals
  ["Fractions", "Decimals"],
  ["Decimals", "Comparing Decimals"],

  // Ratio
  ["Fractions", "Ratio"],
  ["Ratio", "Proportion"],

  // Algebra
  ["Whole Numbers", "Variables"],
  ["Variables", "Simple Equations"],

  // Geometry
  ["Whole Numbers", "Lines and Angles"],
  ["Lines and Angles", "Triangles"],

  // Mensuration
  ["Lines and Angles", "Perimeter"],
  ["Perimeter", "Area"],

  // Data Handling
  ["Whole Numbers", "Data Collection"],
  ["Data Collection", "Bar Graphs"],
];

export async function seedConceptEdges() {
  const allConcepts = await db.select().from(concepts);

  const conceptMap = new Map(
    allConcepts.map((concept) => [concept.title, concept.id]),
  );

  const edges = prerequisiteGraph
    .map(([parentTitle, childTitle]) => {
      const parentId = conceptMap.get(parentTitle);
      const childId = conceptMap.get(childTitle);

      if (!parentId || !childId) {
        console.warn(
          `Skipping edge: ${parentTitle} -> ${childTitle}`,
        );

        return null;
      }

      return {
        parentConceptId: parentId,
        childConceptId: childId,
      };
    })
    .filter(
      (
        edge,
      ): edge is {
        parentConceptId: string;
        childConceptId: string;
      } => edge !== null,
    );

  await db
    .insert(conceptEdges)
    .values(edges)
    .onConflictDoNothing();
}