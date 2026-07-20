/**
 * Input required to generate a practice set.
 */
export interface GeneratePracticeInput {
  /**
   * Concept to practice.
   */
  conceptId: string;

  /**
   * Current learner mastery (0–100).
   */
  mastery: number;

  /**
   * Number of questions to generate.
   *
   * Defaults to 5.
   */
  count?: number;
}