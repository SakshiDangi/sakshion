import type {
  Answer,
  AssessmentResult,
  AssessmentSession,
  DiagnosticQuestion,
} from "../models";

import {
  QuestionLoader,
  QuestionRepository,
  QuestionSelector,
} from "../question-bank";

import { AssessmentSessionManager } from "../session";

import {
  AnswerEvaluator,
  ConceptEvaluator,
} from "../evaluator";

import {
  ScoreCalculator,
  MasteryCalculator,
} from "../scoring";

import { ConfidenceEstimator } from "../confidence";

import { AssessmentMapper } from "../mapper";

import { AssessmentValidator } from "../validation";

export class DiagnosticService {
  private readonly sessionManager: AssessmentSessionManager;

  private readonly answerEvaluator =
    new AnswerEvaluator();

  private readonly conceptEvaluator =
    new ConceptEvaluator();

  private readonly scoreCalculator =
    new ScoreCalculator();

  private readonly masteryCalculator =
    new MasteryCalculator();

  private readonly confidenceEstimator =
    new ConfidenceEstimator();

  private readonly mapper =
    new AssessmentMapper();

  private readonly validator =
    new AssessmentValidator();

  constructor(
    repository: QuestionRepository,
  ) {
    const loader =
      new QuestionLoader(
        repository,
      );

    loader.load();

    const selector =
      new QuestionSelector(
        repository,
      );

    const questions =
      selector.select();

    this.sessionManager =
      new AssessmentSessionManager(
        questions,
      );
  }

  /**
   * Starts a new assessment.
   */
  createSession(
    studentId: string,
  ): AssessmentSession {
    return this.sessionManager.start(
      studentId,
    );
  }

  /**
   * Returns the current question.
   */
  getCurrentQuestion():
    | DiagnosticQuestion
    | undefined {
    return this.sessionManager.getCurrentQuestion();
  }

  /**
   * Records an answer.
   */
  submitAnswer(
    answer: Answer,
  ): void {
    this.sessionManager.submitAnswer(
      answer,
    );
  }

  /**
   * Advances to the next question.
   */
  nextQuestion():
    | DiagnosticQuestion
    | undefined {
    return this.sessionManager.nextQuestion();
  }

  /**
   * Returns assessment progress.
   */
  getProgress(): {
    answered: number;
    total: number;
  } {
    return this.sessionManager.getProgress();
  }

  /**
   * Completes the assessment and
   * produces the final result.
   */
  completeAssessment():
    AssessmentResult {
    const session =
      this.sessionManager.finish();

    this.validator.validate(
      session,
    );

    const evaluations =
      session.answers.map(
        (answer) => {
          const question =
            session.questions.find(
              (q) =>
                q.id ===
                answer.questionId,
            );

          if (
            question ===
            undefined
          ) {
            throw new Error(
              `Unknown question: ${answer.questionId}`,
            );
          }

          return this.answerEvaluator.evaluate(
            question,
            answer,
          );
        },
      );

    const conceptScores =
      this.conceptEvaluator.evaluate(
        session.questions,
        evaluations,
      );

    const scoredConcepts =
      this.scoreCalculator.calculate(
        conceptScores,
      );

    const masteredConcepts =
      this.masteryCalculator.calculate(
        scoredConcepts,
      );

    const confidence =
      this.confidenceEstimator.estimate(
        masteredConcepts,
        session.questions,
        session.answers,
      );

    return this.mapper.map(
      masteredConcepts,
      confidence,
    );
  }
}