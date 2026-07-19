import type {
  Answer,
  ConceptScore,
  DiagnosticQuestion,
} from "../models";

export class ConfidenceEstimator {
  /**
   * Estimates confidence for
   * every concept.
   */
  estimate(
    conceptScores: ConceptScore[],
    questions: DiagnosticQuestion[],
    answers: Answer[],
  ): Map<string, number> {
    const confidence =
      new Map<string, number>();

    for (const concept of conceptScores) {
      const conceptQuestions =
        questions.filter(
          (question) =>
            question.conceptId ===
            concept.conceptId,
        );

      const conceptAnswers =
        answers.filter((answer) =>
          conceptQuestions.some(
            (question) =>
              question.id ===
              answer.questionId,
          ),
        );

      const evidence =
        this.calculateEvidence(
          conceptAnswers.length,
        );

      const timing =
        this.calculateTiming(
          conceptQuestions,
          conceptAnswers,
        );

      confidence.set(
        concept.conceptId,
        Math.round(
          evidence * 0.7 +
            timing * 0.3,
        ),
      );
    }

    return confidence;
  }

  private calculateEvidence(
    count: number,
  ): number {
    if (count >= 3) {
      return 100;
    }

    if (count === 2) {
      return 70;
    }

    if (count === 1) {
      return 40;
    }

    return 0;
  }

  private calculateTiming(
    questions: DiagnosticQuestion[],
    answers: Answer[],
  ): number {
    if (
      questions.length === 0 ||
      answers.length === 0
    ) {
      return 0;
    }

    const expected =
      questions.reduce(
        (sum, question) =>
          sum +
          question.estimatedSeconds,
        0,
      ) / questions.length;

    const actual =
      answers.reduce(
        (sum, answer) =>
          sum +
          answer.timeSpent,
        0,
      ) / answers.length;

    const ratio =
      actual / expected;

    if (ratio >= 1) {
      return 100;
    }

    if (ratio >= 0.75) {
      return 80;
    }

    if (ratio >= 0.5) {
      return 60;
    }

    if (ratio >= 0.25) {
      return 40;
    }

    return 20;
  }
}