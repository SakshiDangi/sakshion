import type {
  AssessmentSession,
} from "../models";

export class AssessmentValidator {
  /**
   * Validates an assessment
   * before evaluation.
   */
  validate(
    session: AssessmentSession,
  ): void {
    if (!session.isCompleted) {
      throw new Error(
        "Assessment session has not been completed.",
      );
    }

    if (
      session.answers.length <
      session.questions.length
    ) {
      throw new Error(
        "Not all questions have been answered.",
      );
    }

    const seen =
      new Set<string>();

    for (const answer of session.answers) {
      if (
        answer.response.trim() === ""
      ) {
        throw new Error(
          `Question ${answer.questionId} has an empty response.`,
        );
      }

      if (
        seen.has(
          answer.questionId,
        )
      ) {
        throw new Error(
          `Duplicate answer for question ${answer.questionId}.`,
        );
      }

      seen.add(
        answer.questionId,
      );

      const exists =
        session.questions.some(
          (
            question,
          ) =>
            question.id ===
            answer.questionId,
        );

      if (!exists) {
        throw new Error(
          `Unknown question: ${answer.questionId}.`,
        );
      }
    }
  }
}