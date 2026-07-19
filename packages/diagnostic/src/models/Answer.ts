export interface Answer {
  /**
   * Question being answered.
   */
  questionId: string;

  /**
   * Student response.
   *
   * Using a generic string allows future
   * support for multiple question types.
   */
  response: string;

  /**
   * Time spent answering.
   *
   * Measured in seconds.
   */
  timeSpent: number;

  /**
   * Submission timestamp.
   */
  submittedAt: Date;
}