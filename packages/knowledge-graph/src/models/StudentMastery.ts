export interface StudentMastery {
  /**
   * Concept identifier.
   */
  conceptId: string;

  /**
   * Mastery percentage (0–100).
   */
  mastery: number;

  /**
   * Confidence percentage (0–100).
   */
  confidence: number;
}