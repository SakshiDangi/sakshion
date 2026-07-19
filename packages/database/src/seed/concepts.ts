import { db } from "../client";
import { concepts } from "../schema";

const grade6Concepts = [
  // Whole Numbers
  {
    subject: "Mathematics",
    grade: 6,
    title: "Whole Numbers",
    description: "Introduction to whole numbers",
    difficulty: 1,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Comparing Whole Numbers",
    description: "Compare and order whole numbers",
    difficulty: 1,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Place Value",
    description: "Understanding place value",
    difficulty: 1,
  },

  // Factors & Multiples
  {
    subject: "Mathematics",
    grade: 6,
    title: "Factors",
    description: "Finding factors of numbers",
    difficulty: 2,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Multiples",
    description: "Finding multiples",
    difficulty: 2,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Prime Numbers",
    description: "Prime and composite numbers",
    difficulty: 2,
  },

  // Integers
  {
    subject: "Mathematics",
    grade: 6,
    title: "Integers",
    description: "Positive and negative numbers",
    difficulty: 2,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Ordering Integers",
    description: "Compare integers",
    difficulty: 2,
  },

  // Fractions
  {
    subject: "Mathematics",
    grade: 6,
    title: "Fractions",
    description: "Introduction to fractions",
    difficulty: 3,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Equivalent Fractions",
    description: "Equivalent fractions",
    difficulty: 3,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Comparing Fractions",
    description: "Compare fractions",
    difficulty: 3,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Addition of Fractions",
    description: "Add fractions",
    difficulty: 3,
  },

  // Decimals
  {
    subject: "Mathematics",
    grade: 6,
    title: "Decimals",
    description: "Decimal numbers",
    difficulty: 3,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Comparing Decimals",
    description: "Compare decimals",
    difficulty: 3,
  },

  // Ratio
  {
    subject: "Mathematics",
    grade: 6,
    title: "Ratio",
    description: "Introduction to ratio",
    difficulty: 4,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Proportion",
    description: "Understanding proportion",
    difficulty: 4,
  },

  // Algebra
  {
    subject: "Mathematics",
    grade: 6,
    title: "Variables",
    description: "Understanding variables",
    difficulty: 4,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Simple Equations",
    description: "Solve simple equations",
    difficulty: 4,
  },

  // Geometry
  {
    subject: "Mathematics",
    grade: 6,
    title: "Lines and Angles",
    description: "Basic geometry",
    difficulty: 3,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Triangles",
    description: "Types of triangles",
    difficulty: 3,
  },

  // Mensuration
  {
    subject: "Mathematics",
    grade: 6,
    title: "Perimeter",
    description: "Calculate perimeter",
    difficulty: 4,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Area",
    description: "Calculate area",
    difficulty: 4,
  },

  // Data Handling
  {
    subject: "Mathematics",
    grade: 6,
    title: "Data Collection",
    description: "Collecting data",
    difficulty: 2,
  },
  {
    subject: "Mathematics",
    grade: 6,
    title: "Bar Graphs",
    description: "Reading bar graphs",
    difficulty: 2,
  },
];

export async function seedConcepts() {
  await db
    .insert(concepts)
    .values(grade6Concepts)
    .onConflictDoNothing();
}