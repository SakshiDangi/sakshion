import type {
  PracticeAnswer,
  PracticeQuestion,
} from "../models";

import type { AnswerEvaluation } from "./AnswerEvaluation";

/**
 * Evaluates a single learner answer.
 */
export class AnswerEvaluator {
  /**
   * Evaluate one answer.
   */
  evaluate(
    question: PracticeQuestion,
    answer: PracticeAnswer,
  ): AnswerEvaluation {
    if (question.id !== answer.questionId) {
      throw new Error(
        "Question and answer do not match.",
      );
    }

    return {
      questionId: question.id,

      correct:
        question.correctAnswer ===
        answer.selectedAnswer,

      correctAnswer: question.correctAnswer,

      selectedAnswer: answer.selectedAnswer,
    };
  }
}