import type {
  PracticeDifficulty,
  PracticeQuestion,
} from "../models";

import type { QuestionRepository } from "./QuestionRepository";

/**
 * Selects practice questions for a concept.
 */
export class QuestionSelector {
  constructor(
    private readonly repository: QuestionRepository,
  ) {}

  /**
   * Select questions.
   *
   * Rules:
   * - Same concept
   * - Requested difficulty
   * - No duplicate ids
   * - Maximum count returned
   */
  async select(
    conceptId: string,
    difficulty: PracticeDifficulty,
    count = 5,
  ): Promise<readonly PracticeQuestion[]> {
    const questions =
      await this.repository.findByConceptAndDifficulty(
        conceptId,
        difficulty,
      );

    const unique = new Map<string, PracticeQuestion>();

    for (const question of questions) {
      unique.set(question.id, question);
    }

    const selected =
      Array.from(unique.values()).slice(0, count);

    if (selected.length < count) {
      throw new Error(
        `Only ${selected.length} questions available for concept "${conceptId}" and difficulty "${difficulty}".`,
      );
    }

    return selected;
  }
}