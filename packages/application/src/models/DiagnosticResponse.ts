/**
 * Result returned after
 * a diagnostic assessment.
 */
export interface DiagnosticResponse {
  /**
   * Request status.
   */
  success: boolean;

  /**
   * Student identifier.
   */
  studentId: string;

  /**
   * Diagnostic score.
   */
  score: number;

  /**
   * Initial mastery estimate.
   */
  mastery: number;

  /**
   * Concepts recommended
   * for learning next.
   */
  recommendedConcepts: string[];
}