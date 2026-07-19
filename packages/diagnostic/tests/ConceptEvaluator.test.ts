import {
  describe,
  expect,
  it,
} from "vitest";

import { ConceptEvaluator } from "../src/evaluator";

import type {
  DiagnosticQuestion,
  EvaluationResult,
} from "../src/models";

describe("ConceptEvaluator", () => {
  const evaluator =
    new ConceptEvaluator();

  const questions: DiagnosticQuestion[] = [
    {
      id: "q1",
      conceptId: "fractions",
      difficulty: 1,
      type: "multiple-choice",
      question: "1/2 + 1/2",
      options: [
        "1",
        "2",
      ],
      correctAnswer: "1",
      explanation: "Answer",
      estimatedSeconds: 30,
    },

    {
      id: "q2",
      conceptId: "fractions",
      difficulty: 1,
      type: "multiple-choice",
      question: "1/4 + 1/4",
      options: [
        "1/2",
        "1",
      ],
      correctAnswer: "1/2",
      explanation: "Answer",
      estimatedSeconds: 30,
    },

    {
      id: "q3",
      conceptId: "division",
      difficulty: 1,
      type: "multiple-choice",
      question: "8 ÷ 2",
      options: [
        "2",
        "4",
      ],
      correctAnswer: "4",
      explanation: "Answer",
      estimatedSeconds: 30,
    },
  ];

  it("groups results by concept", () => {
    const evaluations: EvaluationResult[] = [
      {
        questionId: "q1",
        isCorrect: true,
        points: 1,
        feedback: "",
        explanation: "",
      },

      {
        questionId: "q2",
        isCorrect: false,
        points: 0,
        feedback: "",
        explanation: "",
      },

      {
        questionId: "q3",
        isCorrect: true,
        points: 1,
        feedback: "",
        explanation: "",
      },
    ];

    const result =
      evaluator.evaluate(
        questions,
        evaluations,
      );

    expect(
      result,
    ).toHaveLength(2);

    const fractions =
      result.find(
        (c) =>
          c.conceptId ===
          "fractions",
      );

    expect(
      fractions,
    ).toBeDefined();

    expect(
      fractions?.correct,
    ).toBe(1);

    expect(
      fractions?.incorrect,
    ).toBe(1);

    expect(
      fractions?.score,
    ).toBe(50);

    const division =
      result.find(
        (c) =>
          c.conceptId ===
          "division",
      );

    expect(
      division?.correct,
    ).toBe(1);

    expect(
      division?.incorrect,
    ).toBe(0);

    expect(
      division?.score,
    ).toBe(100);
  });

  it("returns empty array for no evaluations", () => {
    expect(
      evaluator.evaluate(
        questions,
        [],
      ),
    ).toEqual([]);
  });
});