import type { MasteryUpdate } from "./MasteryUpdate";

/**
 * Input required to calculate updated learner mastery.
 */
export interface CalculateMasteryInput {
  /**
   * Current learner mastery (0–100).
   */
  mastery: number;

  /**
   * Current learner confidence (0–100).
   */
  confidence: number;

  /**
   * Practice score (0–100).
   */
  score: number;
}

/**
 * Calculates mastery and confidence updates after a practice session.
 */
export class PracticeMasteryCalculator {
  /**
   * Calculate updated learner state.
   */
  calculate(
    input: CalculateMasteryInput,
  ): MasteryUpdate {
    this.validate(input);

    const masteryDelta =
      this.calculateMasteryDelta(input.score);

    const confidenceDelta =
      this.calculateConfidenceDelta(
        input.score,
      );

    return {
      masteryBefore: input.mastery,

      masteryAfter: this.clamp(
        input.mastery + masteryDelta,
      ),

      confidenceBefore: input.confidence,

      confidenceAfter: this.clamp(
        input.confidence +
          confidenceDelta,
      ),

      masteryDelta,

      confidenceDelta,
    };
  }

  /**
   * Calculate mastery improvement.
   */
  private calculateMasteryDelta(
    score: number,
  ): number {
    if (score === 100) {
      return 10;
    }

    if (score >= 80) {
      return 7;
    }

    if (score >= 60) {
      return 4;
    }

    if (score >= 40) {
      return 1;
    }

    return 0;
  }

  /**
   * Calculate confidence improvement.
   */
  private calculateConfidenceDelta(
    score: number,
  ): number {
    if (score === 100) {
      return 5;
    }

    if (score >= 80) {
      return 4;
    }

    if (score >= 60) {
      return 3;
    }

    if (score >= 40) {
      return 2;
    }

    return 1;
  }

  /**
   * Clamp a value to the range 0–100.
   */
  private clamp(
    value: number,
  ): number {
    return Math.min(
      100,
      Math.max(0, value),
    );
  }

  /**
   * Validate calculator input.
   */
  private validate(
    input: CalculateMasteryInput,
  ): void {
    this.validateRange(
      input.mastery,
      "Mastery",
    );

    this.validateRange(
      input.confidence,
      "Confidence",
    );

    this.validateRange(
      input.score,
      "Score",
    );
  }

  /**
   * Validate a numeric value is within 0–100.
   */
  private validateRange(
    value: number,
    field: string,
  ): void {
    if (
      Number.isNaN(value) ||
      value < 0 ||
      value > 100
    ) {
      throw new RangeError(
        `${field} must be between 0 and 100.`,
      );
    }
  }
}