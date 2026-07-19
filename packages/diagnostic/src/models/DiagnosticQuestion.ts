export interface DiagnosticQuestion {
  /**
   * Unique question identifier.
   */
  id: string;

  /**
   * Knowledge graph concept measured by this question.
   */
  conceptId: string;

  /**
   * Difficulty level.
   *
   * Range:
   * 1 (easy)
   * 5 (very difficult)
   */
  difficulty: number;

  /**
   * Question type.
   */
  type:
    | "multiple-choice"
    | "true-false";

  /**
   * Question text.
   */
  question: string;

  /**
   * Available answer options.
   */
  options: string[];

  /**
   * Correct option.
   */
  correctAnswer: string;

  /**
   * Explanation shown after assessment.
   */
  explanation: string;

  /**
   * Expected solving time.
   */
  estimatedSeconds: number;
}