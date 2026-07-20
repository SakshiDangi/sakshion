import type { PracticeQuestion } from  "../models";

/**
 * Input required to create a practice session.
 */
export interface CreatePracticeSessionInput {
  /**
   * Session identifier.
   */
  sessionId: string;

  /**
   * Student starting the practice.
   */
  studentId: string;

  /**
   * Concept being practiced.
   */
  conceptId: string;

  /**
   * Questions assigned to this session.
   */
  questions: readonly PracticeQuestion[];
}