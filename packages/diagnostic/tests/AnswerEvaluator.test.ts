import { describe, expect, it } from "vitest";

import { AnswerEvaluator } from "../src/evaluator";

import type {
  Answer,
  DiagnosticQuestion,
} from "../src/models";

describe("AnswerEvaluator", () => {
  const evaluator =
    new AnswerEvaluator();

  const question: DiagnosticQuestion = {
    id: "q1",

    conceptId: "fractions",

    difficulty: 1,

    type: "multiple-choice",

    question:
      "What is 1/2 + 1/2?",

    options: [
      "1",
      "2",
      "3",
      "4",
    ],

    correctAnswer: "1",

    explanation:
      "1/2 + 1/2 = 1.",

    estimatedSeconds: 30,
  };

  it("evaluates a correct answer", () => {
    const answer: Answer = {
      questionId: "q1",

      response: "1",

      timeSpent: 10,

      submittedAt: new Date(),
    };

    const result =
      evaluator.evaluate(
        question,
        answer,
      );

    expect(
      result.questionId,
    ).toBe("q1");

    expect(
      result.isCorrect,
    ).toBe(true);

    expect(
      result.points,
    ).toBe(1);

    expect(
      result.feedback,
    ).toBe("Correct!");

    expect(
      result.explanation,
    ).toBe(
      "1/2 + 1/2 = 1.",
    );
  });

  it("evaluates an incorrect answer", () => {
    const answer: Answer = {
      questionId: "q1",

      response: "2",

      timeSpent: 15,

      submittedAt: new Date(),
    };

    const result =
      evaluator.evaluate(
        question,
        answer,
      );

    expect(
      result.questionId,
    ).toBe("q1");

    expect(
      result.isCorrect,
    ).toBe(false);

    expect(
      result.points,
    ).toBe(0);

    expect(
      result.feedback,
    ).toBe("Incorrect.");

    expect(
      result.explanation,
    ).toBe(
      "1/2 + 1/2 = 1.",
    );
  });
});