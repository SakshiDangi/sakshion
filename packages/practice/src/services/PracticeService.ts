import { randomUUID } from "node:crypto";

import type {
  PracticeAnswer,
  PracticeQuestion,
  PracticeSession,
} from "../models";

import { PracticeGenerator } from "../generator/PracticeGenerator";
import { PracticeSessionManager } from "../session/PracticeSessionManager";

import { PracticeValidator } from "../validation/PracticeValidator";

import { PracticeEvaluator } from "../evaluator/PracticeEvaluator";

import { PracticeMasteryCalculator } from "../mastery";

import { FeedbackGenerator } from "../feedback";

import { PracticeEventBuilder } from "../events";

import type { PracticeServiceResult } from "./PracticeServiceResult";


/**
 * Public API for the Practice package.
 */
export class PracticeService {

  constructor(
    private readonly generator: PracticeGenerator,

    private readonly sessions: PracticeSessionManager,

    private readonly validator =
      new PracticeValidator(),

    private readonly evaluator =
      new PracticeEvaluator(),

    private readonly masteryCalculator =
      new PracticeMasteryCalculator(),

    private readonly feedbackGenerator =
      new FeedbackGenerator(),

    private readonly eventBuilder =
      new PracticeEventBuilder(),
  ) {}



  /**
   * Generate practice questions.
   */
  async generate(
    conceptId: string,

    mastery: number,

    count = 5,
  ): Promise<readonly PracticeQuestion[]> {

    return this.generator.generate({
      conceptId,

      mastery,

      count,
    });
  }



  /**
   * Start a new practice session.
   */
  start(
    studentId: string,

    conceptId: string,

    questions: readonly PracticeQuestion[],
  ): PracticeSession {

    return this.sessions.create({
      sessionId:
        randomUUID(),

      studentId,

      conceptId,

      questions,
    });
  }



  /**
   * Submit a learner answer.
   */
  submit(
    session: PracticeSession,

    answer: PracticeAnswer,
  ): PracticeSession {

    return this.sessions.submitAnswer({
      sessionId:
        session.sessionId,

      answer,
    });
  }



  /**
   * Complete practice session.
   *
   * Flow:
   *
   * Validate completion
   *       ↓
   * Validate session integrity
   *       ↓
   * Finish session
   *       ↓
   * Evaluate answers
   *       ↓
   * Update mastery
   *       ↓
   * Generate feedback
   *       ↓
   * Create Finality event
   */
  complete(
    session: PracticeSession,

    mastery: number,

    confidence: number,
  ): PracticeServiceResult {


    /*
      Step 1:
      Ensure every question
      has been answered.
    */
    if (
      !this.sessions.isComplete(
        session.sessionId,
      )
    ) {
      throw new Error(
        "Practice session is not complete.",
      );
    }



    /*
      Step 2:
      Validate session data.
    */
    this.validator.validateSession(
      session,
    );



    /*
      Step 3:
      Mark session completed.
    */
    const completed =
      this.sessions.finish(
        session.sessionId,
      );



    /*
      Step 4:
      Evaluate answers.
    */
    const evaluation =
      this.evaluator.evaluate(
        completed,
      );



    /*
      Step 5:
      Update learner state.
    */
    const masteryUpdate =
      this.masteryCalculator.calculate({
        mastery,

        confidence,

        score:
          evaluation.score,
      });



    /*
      Step 6:
      Generate learner feedback.
    */
    const feedback =
      this.feedbackGenerator.generate(
        evaluation,
      );



    /*
      Step 7:
      Create immutable learning event.
    */
    const event =
      this.eventBuilder.build({
        studentId:
          completed.studentId,

        conceptId:
          completed.conceptId,

        sessionId:
          completed.sessionId,

        score:
          evaluation.score,

        masteryBefore:
          masteryUpdate.masteryBefore,

        masteryAfter:
          masteryUpdate.masteryAfter,

        confidenceBefore:
          masteryUpdate.confidenceBefore,

        confidenceAfter:
          masteryUpdate.confidenceAfter,
      });



    return {

      session:
        completed,

      evaluation,

      mastery:
        masteryUpdate,

      feedback,

      event,
    };
  }
}