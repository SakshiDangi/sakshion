import type { ConceptNode } from "../models";

export const concepts: ConceptNode[] = [
  {
    id: "math.division",
    title: "Division",
    description: "Understand division.",
    subject: "Mathematics",
    grade: 6,
    difficulty: 2,
    estimatedMinutes: 30,
    learningObjectives: [
      "Divide whole numbers",
    ],
  },

  {
    id: "math.fractions",
    title: "Fractions",
    description: "Understand fractions.",
    subject: "Mathematics",
    grade: 6,
    difficulty: 4,
    estimatedMinutes: 45,
    learningObjectives: [
      "Represent fractions",
    ],
  },

  {
    id: "math.equivalent-fractions",
    title: "Equivalent Fractions",
    description: "Find equivalent fractions.",
    subject: "Mathematics",
    grade: 6,
    difficulty: 5,
    estimatedMinutes: 45,
    learningObjectives: [
      "Generate equivalent fractions",
    ],
  },

  {
    id: "math.percentages",
    title: "Percentages",
    description: "Learn percentages.",
    subject: "Mathematics",
    grade: 6,
    difficulty: 6,
    estimatedMinutes: 60,
    learningObjectives: [
      "Convert between fractions and percentages",
    ],
  },
];