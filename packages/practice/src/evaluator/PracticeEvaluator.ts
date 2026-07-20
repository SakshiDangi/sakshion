import type {
  PracticeAnswer,
  PracticeQuestion,
  PracticeSession,
} from "../models";

import { AnswerEvaluator } from "./AnswerEvaluator";
import type { AnswerEvaluation } from "./AnswerEvaluation";
import type { PracticeEvaluation } from "./PracticeEvaluation";

/**
 * Evaluates an entire practice session.
 */
export class PracticeEvaluator {
  constructor(
    private readonly answerEvaluator: AnswerEvaluator = new AnswerEvaluator(),
  ) {}

  /**
   * Evaluate all answers in a practice session.
   */
  evaluate(
    session: PracticeSession,
  ): PracticeEvaluation {
    const evaluations: AnswerEvaluation[] = [];

    for (const question of session.questions) {
      const answer = this.findAnswer(
        session.answers,
        question.id,
      );

      evaluations.push(
        this.answerEvaluator.evaluate(
          question,
          answer,
        ),
      );
    }

    const totalQuestions =
      evaluations.length;

    const correctAnswers =
      evaluations.filter(
        evaluation => evaluation.correct,
      ).length;

    const incorrectAnswers =
      totalQuestions - correctAnswers;

    const score =
      totalQuestions === 0
        ? 0
        : Math.round(
            (correctAnswers / totalQuestions) * 100,
          );

    const accuracy =
      totalQuestions === 0
        ? 0
        : correctAnswers / totalQuestions;

    const weakQuestionIds =
      evaluations
        .filter(
          evaluation => !evaluation.correct,
        )
        .map(
          evaluation => evaluation.questionId,
        );

    return {
      totalQuestions,

      correctAnswers,

      incorrectAnswers,

      score,

      accuracy,

      evaluations,

      weakQuestionIds,
    };
  }

  /**
   * Finds the submitted answer for a question.
   */
  private findAnswer(
    answers: readonly PracticeAnswer[],
    questionId: string,
  ): PracticeAnswer {
    const answer =
      answers.find(
        current =>
          current.questionId === questionId,
      );

    if (!answer) {
      throw new Error(
        `Missing answer for question "${questionId}".`,
      );
    }

    return answer;
  }
}