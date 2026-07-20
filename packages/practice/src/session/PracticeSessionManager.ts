import {
  PracticeSessionStatus,
  type PracticeAnswer,
  type PracticeSession,
} from "../models";

import type { CreatePracticeSessionInput } from "./CreatePracticeSessionInput";
import type { SubmitPracticeAnswerInput } from "./SubmitPracticeAnswerInput";

/**
 * Manages the lifecycle of a practice session.
 */
export class PracticeSessionManager {
  /**
   * Active practice sessions.
   *
   * The MVP stores sessions in memory.
   * A future implementation can delegate persistence
   * to packages/database.
   */
  private readonly sessions = new Map<string, PracticeSession>();

  /**
   * Create a new practice session.
   */
  create(
    input: CreatePracticeSessionInput,
  ): PracticeSession {
    if (this.sessions.has(input.sessionId)) {
      throw new Error(
        `Practice session "${input.sessionId}" already exists.`,
      );
    }

    const session: PracticeSession = {
      sessionId: input.sessionId,

      studentId: input.studentId,

      conceptId: input.conceptId,

      questions: input.questions,

      answers: [],

      status: PracticeSessionStatus.IN_PROGRESS,

      startedAt: new Date(),
    };

    this.sessions.set(
      session.sessionId,
      session,
    );

    return session;
  }

  /**
   * Find an existing session.
   */
  get(
    sessionId: string,
  ): PracticeSession {
    const session =
      this.sessions.get(sessionId);

    if (!session) {
      throw new Error(
        `Practice session "${sessionId}" was not found.`,
      );
    }

    return session;
  }

  /**
   * Submit one learner answer.
   */
  submitAnswer(
    input: SubmitPracticeAnswerInput,
  ): PracticeSession {
    const session =
      this.get(input.sessionId);

    if (
      session.status !==
      PracticeSessionStatus.IN_PROGRESS
    ) {
      throw new Error(
        "Practice session is already completed.",
      );
    }

    const duplicate =
      session.answers.some(
        answer =>
          answer.questionId ===
          input.answer.questionId,
      );

    if (duplicate) {
      throw new Error(
        `Question "${input.answer.questionId}" has already been answered.`,
      );
    }

    const updated: PracticeSession = {
      ...session,

      answers: [
        ...session.answers,
        input.answer,
      ],
    };

    this.sessions.set(
      updated.sessionId,
      updated,
    );

    return updated;
  }

  /**
   * Complete a practice session.
   */
  finish(
    sessionId: string,
  ): PracticeSession {
    const session =
      this.get(sessionId);

    if (
      session.status ===
      PracticeSessionStatus.COMPLETED
    ) {
      throw new Error(
        "Practice session has already been completed.",
      );
    }

    const updated: PracticeSession = {
      ...session,

      status:
        PracticeSessionStatus.COMPLETED,

      completedAt: new Date(),
    };

    this.sessions.set(
      updated.sessionId,
      updated,
    );

    return updated;
  }

  /**
   * Returns true if every question has been answered.
   */
  isComplete(
    sessionId: string,
  ): boolean {
    const session =
      this.get(sessionId);

    return (
      session.answers.length ===
      session.questions.length
    );
  }
}