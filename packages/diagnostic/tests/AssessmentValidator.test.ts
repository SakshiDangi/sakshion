import { describe, expect, it } from "vitest";

import { AssessmentValidator } from "../src/validation";

import type {
  Answer,
  AssessmentSession,
  DiagnosticQuestion,
} from "../src/models";

describe("AssessmentValidator", () => {
  const validator =
    new AssessmentValidator();

  const questions: DiagnosticQuestion[] = [
    {
      id: "q1",
      conceptId: "fractions",
      difficulty: 1,
      type: "multiple-choice",
      question: "1/2 + 1/2 = ?",
      options: [
        "1",
        "2",
        "3",
        "4",
      ],
      correctAnswer: "1",
      explanation:
        "Half plus half equals one.",
      estimatedSeconds: 30,
    },

    {
      id: "q2",
      conceptId: "division",
      difficulty: 1,
      type: "multiple-choice",
      question: "8 ÷ 2 = ?",
      options: [
        "2",
        "4",
        "6",
        "8",
      ],
      correctAnswer: "4",
      explanation:
        "8 divided by 2 equals 4.",
      estimatedSeconds: 30,
    },
  ];

  function createAnswer(
    questionId: string,
    response: string,
  ): Answer {
    return {
      questionId,
      response,
      timeSpent: 15,
      submittedAt: new Date(),
    };
  }

  function createSession(): AssessmentSession {
    return {
      sessionId: "session-1",
      studentId: "student-1",
      questions,
      answers: [
        createAnswer(
          "q1",
          "1",
        ),
        createAnswer(
          "q2",
          "4",
        ),
      ],
      currentQuestionIndex: 2,
      startedAt: new Date(),
      completedAt: new Date(),
      isCompleted: true,
    };
  }

  it("validates a completed assessment", () => {
    const session =
      createSession();

    expect(() =>
      validator.validate(
        session,
      ),
    ).not.toThrow();
  });

  it("throws if assessment is incomplete", () => {
    const session =
      createSession();

    session.isCompleted =
      false;

    expect(() =>
      validator.validate(
        session,
      ),
    ).toThrow(
      "Assessment session has not been completed.",
    );
  });

  it("throws if not all questions answered", () => {
    const session =
      createSession();

    session.answers.pop();

    expect(() =>
      validator.validate(
        session,
      ),
    ).toThrow(
      "Not all questions have been answered.",
    );
  });

  it("throws on duplicate answers", () => {
    const session =
      createSession();

    session.answers.push(
      createAnswer(
        "q1",
        "1",
      ),
    );

    expect(() =>
      validator.validate(
        session,
      ),
    ).toThrow(
      "Duplicate answer for question q1.",
    );
  });

  it("throws on unknown question", () => {
    const session =
      createSession();

    session.answers[1] =
      createAnswer(
        "unknown",
        "4",
      );

    expect(() =>
      validator.validate(
        session,
      ),
    ).toThrow(
      "Unknown question: unknown.",
    );
  });

  it("throws on empty response", () => {
    const session =
      createSession();

    session.answers[0] =
      createAnswer(
        "q1",
        "",
      );

    expect(() =>
      validator.validate(
        session,
      ),
    ).toThrow(
      "Question q1 has an empty response.",
    );
  });
});