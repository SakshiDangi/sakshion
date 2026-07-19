import type { DiagnosticQuestion } from "../../models";

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "division-1",

    conceptId: "math.division",

    difficulty: 1,

    type: "multiple-choice",

    question:
      "What is 12 ÷ 3?",

    options: [
      "2",
      "3",
      "4",
      "6",
    ],

    correctAnswer: "4",

    explanation:
      "12 divided by 3 equals 4.",

    estimatedSeconds: 30,
  },

  {
    id: "fractions-1",

    conceptId: "math.fractions",

    difficulty: 2,

    type: "multiple-choice",

    question:
      "What is 1/2 + 1/2?",

    options: [
      "1/2",
      "1",
      "2",
      "3/2",
    ],

    correctAnswer: "1",

    explanation:
      "One-half plus one-half equals one.",

    estimatedSeconds: 45,
  },

  {
    id: "percentages-1",

    conceptId: "math.percentages",

    difficulty: 2,

    type: "multiple-choice",

    question:
      "50% of 20 equals?",

    options: [
      "5",
      "10",
      "15",
      "20",
    ],

    correctAnswer: "10",

    explanation:
      "50% means half of 20.",

    estimatedSeconds: 40,
  },
];