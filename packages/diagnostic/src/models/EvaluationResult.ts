export interface EvaluationResult {
  /**
   * Question being evaluated.
   */
  questionId: string;

  /**
   * Student answered correctly.
   */
  isCorrect: boolean;

  /**
   * Points awarded.
   */
  points: number;

  /**
   * Feedback shown to learner.
   */
  feedback: string;

    /**
   * Explanation of the correct answer.
   */
  explanation: string;
}