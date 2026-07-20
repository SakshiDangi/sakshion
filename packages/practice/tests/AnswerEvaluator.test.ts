import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
} from "../src/models";

import { AnswerEvaluator } from "../src/evaluator/AnswerEvaluator";

describe("AnswerEvaluator", () => {
  const evaluator = new AnswerEvaluator();

  const question = {
    id: "q1",

    conceptId: "fractions",

    difficulty: PracticeDifficulty.EASY,

    type: PracticeQuestionType.MULTIPLE_CHOICE,

    question: "1/2 = ?",

    options: [
      {
        id: "A",
        text: "2/4",
      },
      {
        id: "B",
        text: "3/4",
      },
    ],

    correctAnswer: "A",

    explanation: "Equivalent fractions",
  };

  it("evaluates a correct answer", () => {
    const result = evaluator.evaluate(
      question,
      {
        questionId: "q1",
        selectedAnswer: "A",
        timeSpent: 10,
        submittedAt: new Date(),
      },
    );

    expect(result.correct).toBe(true);
  });

  it("evaluates an incorrect answer", () => {
    const result = evaluator.evaluate(
      question,
      {
        questionId: "q1",
        selectedAnswer: "B",
        timeSpent: 8,
        submittedAt: new Date(),
      },
    );

    expect(result.correct).toBe(false);
  });

  it("throws when ids do not match", () => {
    expect(() =>
      evaluator.evaluate(
        question,
        {
          questionId: "wrong",

          selectedAnswer: "A",

          timeSpent: 5,

          submittedAt: new Date(),
        },
      ),
    ).toThrow();
  });
});