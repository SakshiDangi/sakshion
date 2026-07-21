import {
  FinalityAdapterService,
} from "@sakshion/finality-adapter";


import type {
  LearningEvent,
} from "@sakshion/finality-adapter";


import type {
  VerificationResponse,
} from "../models";



/**
 * Application-level verification service.
 *
 * Connects learning events with
 * Finality verification pipeline.
 */
export class VerificationService {


  private readonly adapter =
    new FinalityAdapterService();



  async verify(
    event: LearningEvent,
  ): Promise<VerificationResponse> {


    const verification =
      this.adapter.createVerification(
        event,
      );



    const pipeline =
      verification.pipeline;



    const response:
      VerificationResponse = {


        success:
          pipeline.success,


        verification,


      };



    if (pipeline.reason) {

      response.message =
        pipeline.reason;

    }



    return response;


  }


}