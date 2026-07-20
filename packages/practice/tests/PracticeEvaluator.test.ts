import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
  PracticeSessionStatus,
  type PracticeQuestion,
  type PracticeSession,
} from "../src/models";

import { PracticeEvaluator } from "../src/evaluator/PracticeEvaluator";

describe("PracticeEvaluator", () => {
  function createQuestion(
    id: string,
    correctAnswer: string,
  ): PracticeQuestion {
    return {
      id,
      conceptId: "fractions",
      difficulty: PracticeDifficulty.EASY,
      type: PracticeQuestionType.MULTIPLE_CHOICE,
      question: `Question ${id}`,
      options: [
        {
          id: "A",
          text: "Option A",
        },
        {
          id: "B",
          text: "Option B",
        },
      ],
      correctAnswer,
      explanation: "Explanation",
    };
  }

  function createSession(): PracticeSession {
    return {
      sessionId: "session-1",

      studentId: "student-1",

      conceptId: "fractions",

      status: PracticeSessionStatus.COMPLETED,

      startedAt: new Date(),

      completedAt: new Date(),

      questions: [
        createQuestion("q1", "A"),
        createQuestion("q2", "B"),
      ],

      answers: [
        {
          questionId: "q1",
          selectedAnswer: "A",
          timeSpent: 5,
          submittedAt: new Date(),
        },
        {
          questionId: "q2",
          selectedAnswer: "A",
          timeSpent: 7,
          submittedAt: new Date(),
        },
      ],
    };
  }

  it("evaluates a practice session", () => {
    const evaluator = new PracticeEvaluator();

    const result = evaluator.evaluate(
      createSession(),
    );

    expect(result.totalQuestions).toBe(2);
    expect(result.correctAnswers).toBe(1);
    expect(result.incorrectAnswers).toBe(1);
    expect(result.score).toBe(50);
    expect(result.accuracy).toBe(0.5);
    expect(result.weakQuestionIds).toEqual([
      "q2",
    ]);
  });

  it("throws when an answer is missing", () => {
    const evaluator = new PracticeEvaluator();

    const session = createSession();

    const incompleteSession: PracticeSession = {
      ...session,
      answers: session.answers.slice(0, 1),
    };

    expect(() =>
      evaluator.evaluate(incompleteSession),
    ).toThrow(
      'Missing answer for question "q2".',
    );
  });
});