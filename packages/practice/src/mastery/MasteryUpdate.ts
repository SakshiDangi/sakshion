/**
 * Result of updating learner mastery after practice.
 */
export interface MasteryUpdate {
  /**
   * Previous mastery (0–100).
   */
  masteryBefore: number;

  /**
   * Updated mastery (0–100).
   */
  masteryAfter: number;

  /**
   * Previous confidence (0–100).
   */
  confidenceBefore: number;

  /**
   * Updated confidence (0–100).
   */
  confidenceAfter: number;

  /**
   * Change applied to mastery.
   */
  masteryDelta: number;

  /**
   * Change applied to confidence.
   */
  confidenceDelta: number;
}