import type {
  PracticeDifficulty,
  PracticeQuestion,
} from "../models";

/**
 * Repository used by the Practice package
 * to retrieve questions.
 *
 * Implemented by packages/database.
 */
export interface QuestionRepository {
  /**
   * Returns all questions matching
   * the requested concept and difficulty.
   */
  findByConceptAndDifficulty(
    conceptId: string,
    difficulty: PracticeDifficulty,
  ): Promise<readonly PracticeQuestion[]>;
}