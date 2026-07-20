import type { PracticeQuestion } from "../models";

import { DifficultySelector } from "./DifficultySelector";
import type { GeneratePracticeInput } from "./GeneratePracticeInput";
import { QuestionSelector } from "./QuestionSelector";

/**
 * Generates a practice question set for a learner.
 */
export class PracticeGenerator {
  constructor(
    private readonly difficultySelector: DifficultySelector,
    private readonly questionSelector: QuestionSelector,
  ) {}

  /**
   * Generate practice questions.
   */
  async generate(
    input: GeneratePracticeInput,
  ): Promise<readonly PracticeQuestion[]> {
    const difficulty =
      this.difficultySelector.select(
        input.mastery,
      );

    return this.questionSelector.select(
      input.conceptId,
      difficulty,
      input.count ?? 5,
    );
  }
}