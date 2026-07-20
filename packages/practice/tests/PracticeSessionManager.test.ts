import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
  PracticeSessionStatus,
  type PracticeAnswer,
  type PracticeQuestion,
} from "../src/models";

import { PracticeSessionManager } from "../src/session/PracticeSessionManager";

function createQuestion(id: string): PracticeQuestion {
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

    correctAnswer: "A",

    explanation: "Explanation",
  };
}

function createAnswer(questionId: string): PracticeAnswer {
  return {
    questionId,

    selectedAnswer: "A",

    timeSpent: 12,

    submittedAt: new Date(),
  };
}

describe("PracticeSessionManager", () => {
  function createManager() {
    return new PracticeSessionManager();
  }

  function createSession() {
    const manager = createManager();

    const session = manager.create({
      sessionId: "session-1",
      studentId: "student-1",
      conceptId: "fractions",
      questions: [
        createQuestion("q1"),
        createQuestion("q2"),
        createQuestion("q3"),
      ],
    });

    return {
      manager,
      session,
    };
  }

  it("creates a new practice session", () => {
    const { session } = createSession();

    expect(session.sessionId).toBe("session-1");
    expect(session.studentId).toBe("student-1");
    expect(session.conceptId).toBe("fractions");
    expect(session.questions).toHaveLength(3);
    expect(session.answers).toHaveLength(0);
    expect(session.status).toBe(
      PracticeSessionStatus.IN_PROGRESS,
    );
  });

  it("prevents duplicate session creation", () => {
    const manager = createManager();

    manager.create({
      sessionId: "session-1",
      studentId: "student-1",
      conceptId: "fractions",
      questions: [],
    });

    expect(() =>
      manager.create({
        sessionId: "session-1",
        studentId: "student-1",
        conceptId: "fractions",
        questions: [],
      }),
    ).toThrow();
  });

  it("submits an answer", () => {
    const { manager } = createSession();

    const updated = manager.submitAnswer({
      sessionId: "session-1",
      answer: createAnswer("q1"),
    });

    expect(updated.answers).toHaveLength(1);

    const firstAnswer = updated.answers[0];

    if (!firstAnswer) {
      throw new Error("Expected one submitted answer.");
    }

    expect(firstAnswer.questionId).toBe("q1");
  });

  it("rejects duplicate answers", () => {
    const { manager } = createSession();

    manager.submitAnswer({
      sessionId: "session-1",
      answer: createAnswer("q1"),
    });

    expect(() =>
      manager.submitAnswer({
        sessionId: "session-1",
        answer: createAnswer("q1"),
      }),
    ).toThrow();
  });

  it("finishes a practice session", () => {
    const { manager } = createSession();

    const completed = manager.finish("session-1");

    expect(completed.status).toBe(
      PracticeSessionStatus.COMPLETED,
    );

    expect(completed.completedAt).toBeInstanceOf(Date);
  });

  it("does not allow finishing twice", () => {
    const { manager } = createSession();

    manager.finish("session-1");

    expect(() =>
      manager.finish("session-1"),
    ).toThrow();
  });

  it("does not allow answers after completion", () => {
    const { manager } = createSession();

    manager.finish("session-1");

    expect(() =>
      manager.submitAnswer({
        sessionId: "session-1",
        answer: createAnswer("q1"),
      }),
    ).toThrow();
  });

  it("returns true when all questions are answered", () => {
    const { manager } = createSession();

    manager.submitAnswer({
      sessionId: "session-1",
      answer: createAnswer("q1"),
    });

    manager.submitAnswer({
      sessionId: "session-1",
      answer: createAnswer("q2"),
    });

    manager.submitAnswer({
      sessionId: "session-1",
      answer: createAnswer("q3"),
    });

    expect(
      manager.isComplete("session-1"),
    ).toBe(true);
  });

  it("returns false when practice is incomplete", () => {
    const { manager } = createSession();

    manager.submitAnswer({
      sessionId: "session-1",
      answer: createAnswer("q1"),
    });

    expect(
      manager.isComplete("session-1"),
    ).toBe(false);
  });

  it("throws for unknown session", () => {
    const manager = createManager();

    expect(() =>
      manager.get("unknown"),
    ).toThrow();
  });
});