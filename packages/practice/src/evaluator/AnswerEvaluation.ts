/**
 * Result of evaluating one learner answer.
 */
export interface AnswerEvaluation {
  /**
   * Question identifier.
   */
  questionId: string;

  /**
   * Whether the submitted answer is correct.
   */
  correct: boolean;

  /**
   * Correct answer identifier.
   */
  correctAnswer: string;

  /**
   * Learner's submitted answer.
   */
  selectedAnswer: string;
}