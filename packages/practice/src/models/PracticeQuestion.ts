/**
 * Difficulty level for a practice question.
 */
export enum PracticeDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

/**
 * Supported question formats.
 *
 * The MVP only uses multiple-choice questions,
 * but the enum allows future expansion.
 */
export enum PracticeQuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
}

/**
 * Represents one selectable answer option.
 */
export interface PracticeOption {
  /**
   * Unique option identifier.
   */
  id: string;

  /**
   * Display text shown to the learner.
   */
  text: string;
}

/**
 * Represents one practice question.
 */
export interface PracticeQuestion {
  /**
   * Unique question id.
   */
  id: string;

  /**
   * Knowledge Graph concept this question belongs to.
   */
  conceptId: string;

  /**
   * Question difficulty.
   */
  difficulty: PracticeDifficulty;

  /**
   * Question type.
   */
  type: PracticeQuestionType;

  /**
   * Question prompt.
   */
  question: string;

  /**
   * Available answer choices.
   */
  options: readonly PracticeOption[];

  /**
   * Correct option id.
   */
  correctAnswer: string;

  /**
   * Explanation shown after submission.
   */
  explanation: string;

  /**
   * Optional metadata.
   */
  metadata?: Record<string, unknown>;
}