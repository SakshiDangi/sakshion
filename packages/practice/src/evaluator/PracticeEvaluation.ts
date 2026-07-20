import type { AnswerEvaluation } from "./AnswerEvaluation";

/**
 * Result of evaluating an entire practice session.
 */
export interface PracticeEvaluation {
  /**
   * Total number of questions.
   */
  totalQuestions: number;

  /**
   * Number of correct answers.
   */
  correctAnswers: number;

  /**
   * Number of incorrect answers.
   */
  incorrectAnswers: number;

  /**
   * Percentage score (0–100).
   */
  score: number;

  /**
   * Fraction of correct answers.
   */
  accuracy: number;

  /**
   * Per-question evaluation results.
   */
  evaluations: readonly AnswerEvaluation[];

  /**
   * IDs of incorrectly answered questions.
   */
  weakQuestionIds: readonly string[];
}