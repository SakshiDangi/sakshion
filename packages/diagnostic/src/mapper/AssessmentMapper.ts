import type {
  AssessmentResult,
  ConceptScore,
} from "../models";

export class AssessmentMapper {
  /**
   * Converts concept scores and
   * confidence estimates into the
   * final assessment result.
   */
  map(
    conceptScores: ConceptScore[],
    confidence: Map<string, number>,
  ): AssessmentResult {
    const masteryMap: Record<
      string,
      number
    > = {};

    const confidenceMap: Record<
      string,
      number
    > = {};

    const weakConcepts: string[] = [];

    const strongConcepts: string[] = [];

    for (const concept of conceptScores) {
      masteryMap[
        concept.conceptId
      ] = concept.mastery;

      confidenceMap[
        concept.conceptId
      ] =
        confidence.get(
          concept.conceptId,
        ) ?? 0;

      if (concept.mastery >= 75) {
        strongConcepts.push(
          concept.conceptId,
        );
      }

      if (concept.mastery < 50) {
        weakConcepts.push(
          concept.conceptId,
        );
      }
    }

    const overallScore =
      conceptScores.length === 0
        ? 0
        : conceptScores.reduce(
            (
              total,
              concept,
            ) =>
              total +
              concept.score,
            0,
          ) /
          conceptScores.length;

    return {
      overallScore,

      conceptScores,

      weakConcepts,

      strongConcepts,

      masteryMap,

      confidenceMap,
    };
  }
}