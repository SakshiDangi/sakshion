/**
 * Represents a learner's answer to a single practice question.
 */
export interface PracticeAnswer {
  /**
   * Unique question identifier.
   */
  questionId: string;

  /**
   * Selected answer option id.
   */
  selectedAnswer: string;

  /**
   * Time spent answering the question (in seconds).
   */
  timeSpent: number;

  /**
   * Timestamp when the answer was submitted.
   */
  submittedAt: Date;
}