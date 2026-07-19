import type {
  ConceptScore,
  DiagnosticQuestion,
  EvaluationResult,
} from "../models";

export class ConceptEvaluator {
  /**
   * Aggregates evaluated answers into
   * concept-level scores.
   */
  evaluate(
    questions: DiagnosticQuestion[],
    evaluations: EvaluationResult[],
  ): ConceptScore[] {
    const scores =
      new Map<string, ConceptScore>();

    for (const evaluation of evaluations) {
      const question =
        questions.find(
          (q) =>
            q.id ===
            evaluation.questionId,
        );

      if (question === undefined) {
        continue;
      }

      const conceptId =
        question.conceptId;

      let score =
        scores.get(conceptId);

      if (score === undefined) {
        score = {
          conceptId,
          correct: 0,
          incorrect: 0,
          score: 0,
          mastery: 0,
        };

        scores.set(
          conceptId,
          score,
        );
      }

      if (evaluation.isCorrect) {
        score.correct++;
      } else {
        score.incorrect++;
      }
    }

    for (const score of scores.values()) {
      const total =
        score.correct +
        score.incorrect;

      score.score =
        total === 0
          ? 0
          : (score.correct / total) * 100;
    }

    return [
      ...scores.values(),
    ];
  }
}