import { PracticeDifficulty } from "../models";

/**
 * Selects the appropriate practice difficulty
 * based on the learner's current mastery.
 */
export class DifficultySelector {
  /**
   * Select a difficulty level from a mastery score.
   *
   * Rules:
   *
   * 0–39   → Easy
   * 40–69  → Medium
   * 70–100 → Hard
   *
   * @param mastery Current learner mastery (0–100)
   */
  select(mastery: number): PracticeDifficulty {
    if (mastery < 0 || mastery > 100) {
      throw new RangeError(
        "Mastery must be between 0 and 100."
      );
    }

    if (mastery < 40) {
      return PracticeDifficulty.EASY;
    }

    if (mastery < 70) {
      return PracticeDifficulty.MEDIUM;
    }

    return PracticeDifficulty.HARD;
  }
}