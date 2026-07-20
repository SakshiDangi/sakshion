import type {
  PracticeAnswer,
  PracticeQuestion,
  PracticeSession,
} from "../models";

/**
 * Validates practice sessions before evaluation.
 */
export class PracticeValidator {
  /**
   * Validate an entire practice session.
   */
  validateSession(
    session: PracticeSession,
  ): void {
    this.ensureQuestionsExist(
      session.questions,
    );

    this.ensureNoDuplicateQuestions(
      session.questions,
    );

    this.ensureAllQuestionsAnswered(
      session.questions,
      session.answers,
    );

    this.ensureNoDuplicateAnswers(
      session.answers,
    );
  }

  /**
   * Validate a single submitted answer.
   */
  validateAnswer(
    question: PracticeQuestion,
    answer: PracticeAnswer,
  ): void {
    const optionIds = question.options.map(
      option => option.id,
    );

    if (
      !optionIds.includes(
        answer.selectedAnswer,
      )
    ) {
      throw new Error(
        `Invalid answer "${answer.selectedAnswer}" for question "${question.id}".`,
      );
    }
  }

  /**
   * Ensure the session contains questions.
   */
  private ensureQuestionsExist(
    questions: readonly PracticeQuestion[],
  ): void {
    if (questions.length === 0) {
      throw new Error(
        "Practice session contains no questions.",
      );
    }
  }

  /**
   * Ensure every question has exactly one answer.
   */
  private ensureAllQuestionsAnswered(
    questions: readonly PracticeQuestion[],
    answers: readonly PracticeAnswer[],
  ): void {
    for (const question of questions) {
      const exists = answers.some(
        answer =>
          answer.questionId ===
          question.id,
      );

      if (!exists) {
        throw new Error(
          `Missing answer for question "${question.id}".`,
        );
      }
    }
  }

  /**
   * Prevent duplicate question IDs.
   */
  private ensureNoDuplicateQuestions(
    questions: readonly PracticeQuestion[],
  ): void {
    const ids = new Set<string>();

    for (const question of questions) {
      if (ids.has(question.id)) {
        throw new Error(
          `Duplicate question "${question.id}".`,
        );
      }

      ids.add(question.id);
    }
  }

  /**
   * Prevent duplicate answers.
   */
  private ensureNoDuplicateAnswers(
    answers: readonly PracticeAnswer[],
  ): void {
    const ids = new Set<string>();

    for (const answer of answers) {
      if (
        ids.has(answer.questionId)
      ) {
        throw new Error(
          `Duplicate answer for question "${answer.questionId}".`,
        );
      }

      ids.add(answer.questionId);
    }
  }
}