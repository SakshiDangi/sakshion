/**
 * Canonical event emitted after completing practice.
 */
export interface PracticeEvent {
  /**
   * Event type.
   */
  type: "PracticeCompleted";

  /**
   * Student identifier.
   */
  studentId: string;

  /**
   * Concept identifier.
   */
  conceptId: string;

  /**
   * Practice session identifier.
   */
  sessionId: string;

  /**
   * Practice score.
   */
  score: number;

  /**
   * Mastery before practice.
   */
  masteryBefore: number;

  /**
   * Mastery after practice.
   */
  masteryAfter: number;

  /**
   * Confidence before practice.
   */
  confidenceBefore: number;

  /**
   * Confidence after practice.
   */
  confidenceAfter: number;

  /**
   * Event creation time.
   */
  timestamp: Date;
}