/**
 * Represents the student's performance
 * for a single concept during a diagnostic
 * assessment.
 */
export interface ConceptScore {
  /**
   * Concept identifier.
   */
  conceptId: string;

  /**
   * Number of correctly answered questions.
   */
  correct: number;

  /**
   * Number of incorrectly answered questions.
   */
  incorrect: number;

  /**
   * Percentage score (0–100).
   */
  score: number;

  /**
   * Estimated mastery level (0–100).
   */
  mastery: number;
}