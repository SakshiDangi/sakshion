import {
  describe,
  expect,
  it,
} from "vitest";

import { ConfidenceEstimator } from "../src/confidence";

import type {
  Answer,
  ConceptScore,
  DiagnosticQuestion,
} from "../src/models";

describe("ConfidenceEstimator", () => {
  const estimator =
    new ConfidenceEstimator();

  const questions: DiagnosticQuestion[] = [
    {
      id: "q1",
      conceptId: "fractions",
      difficulty: 1,
      type: "multiple-choice",
      question: "1/2 + 1/2",
      options: ["1", "2"],
      correctAnswer: "1",
      explanation: "",
      estimatedSeconds: 20,
    },

    {
      id: "q2",
      conceptId: "fractions",
      difficulty: 1,
      type: "multiple-choice",
      question: "1/4 + 1/4",
      options: ["1/2", "1"],
      correctAnswer: "1/2",
      explanation: "",
      estimatedSeconds: 20,
    },
  ];

  it("estimates confidence", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 2,
        incorrect: 0,
        score: 100,
        mastery: 95,
      },
    ];

    const answers: Answer[] = [
      {
        questionId: "q1",
        response: "1",
        timeSpent: 20,
        submittedAt: new Date(),
      },

      {
        questionId: "q2",
        response: "1/2",
        timeSpent: 18,
        submittedAt: new Date(),
      },
    ];

    const result =
      estimator.estimate(
        scores,
        questions,
        answers,
      );

    expect(
      result.get(
        "fractions",
      ),
    ).toBeDefined();

    expect(
      result.get(
        "fractions",
      ),
    ).toBeGreaterThan(0);
  });

  it("returns zero confidence when no answers exist", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 0,
        incorrect: 0,
        score: 0,
        mastery: 0,
      },
    ];

    const result =
      estimator.estimate(
        scores,
        questions,
        [],
      );

    expect(
      result.get(
        "fractions",
      ),
    ).toBe(0);
  });

  it("returns an empty map for empty concept scores", () => {
    const result =
      estimator.estimate(
        [],
        questions,
        [],
      );

    expect(
      result.size,
    ).toBe(0);
  });
});