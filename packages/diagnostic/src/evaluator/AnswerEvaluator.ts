import type {
  Answer,
  DiagnosticQuestion,
  EvaluationResult,
} from "../models";

export class AnswerEvaluator {
  /**
   * Evaluates a student's answer.
   */
  evaluate(
    question: DiagnosticQuestion,
    answer: Answer,
  ): EvaluationResult {
    const isCorrect =
      answer.response ===
      question.correctAnswer;

    return {
      questionId: answer.questionId,
      isCorrect,

      points: isCorrect
        ? 1
        : 0,

      feedback: isCorrect
        ? "Correct!"
        : "Incorrect.",

      explanation:
        question.explanation,
    };
  }
}