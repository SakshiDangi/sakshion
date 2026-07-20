import type { PracticeAnswer } from "./PracticeAnswer";
import type { PracticeQuestion } from "./PracticeQuestion";

/**
 * Current lifecycle status of a practice session.
 */
export enum PracticeSessionStatus {
  CREATED = "created",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

/**
 * Represents one learner practice session for a concept.
 */
export interface PracticeSession {
  /**
   * Unique session identifier.
   */
  sessionId: string;

  /**
   * Student attempting the practice.
   */
  studentId: string;

  /**
   * Knowledge Graph concept being practiced.
   */
  conceptId: string;

  /**
   * Questions presented during this session.
   */
  questions: readonly PracticeQuestion[];

  /**
   * Submitted learner answers.
   */
  answers: readonly PracticeAnswer[];

  /**
   * Current session status.
   */
  status: PracticeSessionStatus;

  /**
   * Session start time.
   */
  startedAt: Date;

  /**
   * Session completion time.
   *
   * Undefined until the learner finishes.
   */
  completedAt?: Date;
}