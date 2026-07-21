/**
 * AI tutor response.
 */
export interface TutorResponse {
  /**
   * Request status.
   */
  success: boolean;

  /**
   * AI explanation.
   */
  response: string;

  /**
   * Suggested follow-up questions.
   */
  suggestions: string[];
}