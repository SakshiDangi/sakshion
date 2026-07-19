import type {
  ConceptScore,
} from "../models";

export class ScoreCalculator {
  /**
   * Calculates percentage scores for
   * each concept.
   */
  calculate(
    conceptScores: ConceptScore[],
  ): ConceptScore[] {
    return conceptScores.map(
      (concept) => {
        const total =
          concept.correct +
          concept.incorrect;

        const score =
          total === 0
            ? 0
            : (concept.correct / total) * 100;

        return {
          ...concept,
          score,
        };
      },
    );
  }
}