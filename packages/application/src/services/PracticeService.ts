import {
  VerificationService,
} from "./VerificationService";

import {
  LearningEventType,
} from "@sakshion/finality-adapter";

import type {
  LearningEvent,
} from "@sakshion/finality-adapter";

import type {
  PracticeResponse,
} from "../models";


import {
  PracticeService as CorePracticeService,
} from "@sakshion/practice";

import type {
  PracticeSession,
} from "@sakshion/practice";


/**
 * Application orchestration layer
 *
 * Flow:
 *
 * Practice Package
 *        |
 *        ↓
 * Practice Result
 *        |
 *        ↓
 * Learning Event
 *        |
 *        ↓
 * Finality Verification
 *        |
 *        ↓
 * Application Response
 */
export class PracticeService {

  private readonly verificationService =
    new VerificationService();


  constructor(
    private readonly practiceService:
      CorePracticeService,
  ) {}


  completePractice(
    session: PracticeSession,

    mastery: number,

    confidence: number,

  ): PracticeResponse {


    /**
     * Execute core practice engine.
     */
    const result =
      this.practiceService.complete(
        session,
        mastery,
        confidence,
      );


    /**
     * Convert PracticeEvent
     * into Finality LearningEvent.
     */
    const learningEvent: LearningEvent = {

      id:
        result.event.sessionId,


      studentId:
        result.event.studentId,


      conceptId:
        result.event.conceptId,


      timestamp:
        result.event.timestamp,


      type:
        LearningEventType.PRACTICE_COMPLETED,


      payload:
        {
          ...result.event,
        },

    };


    /**
     * Verify learning event
     * through Finality adapter.
     */
    const verification =
      this.verificationService.verify(
        learningEvent,
      );


    return {

      success:
        true,


      score:
        result.evaluation.score,


      experience:
        result.evaluation.score,


      mastery:
        result.mastery.masteryAfter,


      verification,


      feedback:
        result.feedback.recommendations.join(
          ", ",
        ),

    };
  }
}