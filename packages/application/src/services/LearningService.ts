import {
  VerificationService,
} from "./VerificationService";


import {
  LearningEventRepository,
} from "@sakshion/database";


import type {
  LearningEvent,
} from "@sakshion/finality-adapter";


import type {
  LearningResponse,
} from "../models";



/**
 * Application-level learning service.
 *
 * Flow:
 *
 * Learning Event
 *        |
 *        v
 * VerificationService
 *        |
 *        v
 * Finality Pipeline
 *        |
 *        v
 * Persist Verified Event
 */
export class LearningService {


  private readonly verificationService =
    new VerificationService();


  private readonly repository =
    new LearningEventRepository();



  /**
   * Verify and persist
   * a learning event.
   */
  async learn(
    event: LearningEvent,
  ): Promise<LearningResponse> {


    /**
     * Verify through
     * Finality pipeline.
     */
    const verification =
      await this.verificationService.verify(
        event,
      );



    /**
     * Stop persistence
     * if verification fails.
     */
    if (!verification.success) {

      return {

        success: false,


        eventId:
          event.id,


        verification,

      };

    }



    /**
     * Persist verified
     * learning ledger.
     */
    await this.repository.create({

      studentId:
        event.studentId,


      eventType:
        event.type,


      payload:
        event.payload as Record<
          string,
          unknown
        >,


      /**
       * Future hash-chain support.
       */
      previousHash:
        null,


      /**
       * Finality envelope id.
       */
      hash:
        verification
          .verification
          .envelope
          .header
          .messageId,


      /**
       * Cryptographic signature.
       */
      signature:
        verification
          .verification
          .envelope
          .signature,


      verified:
        verification.success,

    });



    return {

      success: true,


      eventId:
        event.id,


      verification,

    };

  }

}