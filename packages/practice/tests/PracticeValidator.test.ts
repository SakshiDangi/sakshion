import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
  PracticeSessionStatus,
} from "../src/models";
import { PracticeValidator } from "../src/validation/PracticeValidator";

describe("PracticeValidator", () => {
  const validator =
    new PracticeValidator();

  function session() {
    return {
      sessionId: "1",

      studentId: "student",

      conceptId: "fractions",

      status:
        PracticeSessionStatus.COMPLETED,

      startedAt: new Date(),

      completedAt: new Date(),

      questions: [
        {
          id: "q1",

          conceptId: "fractions",

          difficulty:
            PracticeDifficulty.EASY,

          type:
            PracticeQuestionType.MULTIPLE_CHOICE,

          question: "1+1",

          options: [
            {
              id: "A",
              text: "2",
            },
          ],

          correctAnswer: "A",

          explanation: "",
        },
      ],

      answers: [
        {
          questionId: "q1",

          selectedAnswer: "A",

          timeSpent: 5,

          submittedAt: new Date(),
        },
      ],
    };
  }

  it("accepts a valid session", () => {
    expect(() =>
      validator.validateSession(
        session(),
      ),
    ).not.toThrow();
  });

  it("throws for missing answers", () => {
    const s = session();

    s.answers = [];

    expect(() =>
      validator.validateSession(s),
    ).toThrow();
  });

it("throws for duplicate answers", () => {
  const original = session();

  const duplicateSession = {
    ...original,
  
    answers: [
      ...original.answers,
      original.answers[0],
    ] as readonly typeof original.answers[number][],
  };

  expect(() =>
    validator.validateSession(
      duplicateSession,
    ),
  ).toThrow(
    'Duplicate answer for question "q1".',
  );
});
});