import type {
  ConceptScore,
} from "../models";

export class MasteryCalculator {
  /**
   * Converts raw scores into
   * estimated mastery values.
   */
  calculate(
    conceptScores: ConceptScore[],
  ): ConceptScore[] {
    return conceptScores.map(
      (concept) => ({
        ...concept,
        mastery: this.toMastery(
          concept.score,
        ),
      }),
    );
  }

  /**
   * Maps percentage score
   * to mastery estimate.
   */
  private toMastery(
    score: number,
  ): number {
    if (score >= 100) {
      return 95;
    }

    if (score >= 90) {
      return 90;
    }

    if (score >= 80) {
      return 75;
    }

    if (score >= 70) {
      return 65;
    }

    if (score >= 60) {
      return 55;
    }

    if (score >= 50) {
      return 45;
    }

    if (score >= 40) {
      return 35;
    }

    if (score >= 30) {
      return 25;
    }

    if (score >= 20) {
      return 15;
    }

    if (score >= 10) {
      return 10;
    }

    return 5;
  }
}