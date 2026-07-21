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


import {
  PracticeRepository,
  MasteryRepository,
  LearningEventRepository,
} from "@sakshion/database";



/**
 * Application orchestration layer.
 *
 * Flow:
 *
 * Practice Engine
 *        |
 *        v
 * Practice Result
 *        |
 *        +---- Save Practice Attempt
 *        |
 *        +---- Update Mastery
 *        |
 *        v
 * Learning Event
 *        |
 *        v
 * Finality Verification
 *        |
 *        v
 * Save Verified Event
 *        |
 *        v
 * Application Response
 */
export class PracticeService {


  private readonly verificationService =
    new VerificationService();


  private readonly practiceRepository =
    new PracticeRepository();


  private readonly masteryRepository =
    new MasteryRepository();


  private readonly learningEventRepository =
    new LearningEventRepository();



  constructor(
    private readonly practiceService:
      CorePracticeService,
  ) {}



  async completePractice(

    session: PracticeSession,

    mastery: number,

    confidence: number,

  ): Promise<PracticeResponse> {



    /**
     * Execute practice engine.
     */
    const result =
      this.practiceService.complete(

        session,

        mastery,

        confidence,

      );



    /**
     * Save practice attempt.
     */
    await this.practiceRepository.create({

      studentId:
        result.event.studentId,


      conceptId:
        result.event.conceptId,


      score:
        result.evaluation.score,


      masteryBefore:
        result.mastery.masteryBefore,


      masteryAfter:
        result.mastery.masteryAfter,


      completedAt:
        new Date(
          result.event.timestamp,
        ),

    });



    /**
     * Load existing mastery.
     */
    const existingMastery =
      await this.masteryRepository
        .findByStudentAndConcept(

          result.event.studentId,

          result.event.conceptId,

        );



    /**
     * Update student mastery.
     */
    await this.masteryRepository.upsert({

      studentId:
        result.event.studentId,


      conceptId:
        result.event.conceptId,


      mastery:
        result.mastery.masteryAfter,


      confidence,


      attempts:
        (existingMastery?.attempts ?? 0)
        +
        1,

    });



    /**
     * Convert practice result
     * into learning event.
     */
    const learningEvent:
      LearningEvent = {


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


        payload: {

          ...result.event,

        },


      };



    /**
     * Verify through
     * Finality pipeline.
     */
    const verification =
      await this.verificationService.verify(

        learningEvent,

      );



    /**
     * Reject invalid events.
     */
    if (!verification.success) {

      throw new Error(

        verification.message ??

        "Learning verification failed.",

      );

    }



    /**
     * Store verified
     * learning event.
     */
    await this.learningEventRepository.create({

      studentId:
        result.event.studentId,


      eventType:
        learningEvent.type,


      payload:
        learningEvent.payload as Record<
          string,
          unknown
        >,


      previousHash:
        null,


      hash:
        verification
          .verification
          .envelope
          .header
          .messageId,


      signature:
        verification
          .verification
          .envelope
          .signature,


      verified:
        verification.success,

    });



    /**
     * Return response.
     */
    return {


      success: true,


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