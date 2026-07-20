import type { PracticeFeedback } from "./PracticeFeedback";

/**
 * Represents the outcome of a completed practice session.
 */
export interface PracticeResult {
  /**
   * Number of correctly answered questions.
   */
  correctAnswers: number;

  /**
   * Total number of questions.
   */
  totalQuestions: number;

  /**
   * Percentage score (0–100).
   */
  score: number;

  /**
   * Learner mastery before practice.
   */
  masteryBefore: number;

  /**
   * Learner mastery after practice.
   */
  masteryAfter: number;

  /**
   * Learner confidence before practice.
   */
  confidenceBefore: number;

  /**
   * Learner confidence after practice.
   */
  confidenceAfter: number;

  /**
   * Generated learner feedback.
   */
  feedback: PracticeFeedback;
}