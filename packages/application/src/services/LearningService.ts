import {
  FinalityAdapterService,
} from "@sakshion/finality-adapter";

import type {
  LearningEvent,
} from "@sakshion/finality-adapter";

import type {
  LearningResponse,
} from "../models";

export class LearningService {
  private readonly adapter =
    new FinalityAdapterService();

  learn(
    event: LearningEvent,
  ): LearningResponse {

    const verification =
      this.adapter.createVerification(
        event,
      );

    return {
      success:
        verification.pipeline.success,

      eventId:
        event.id,

      verification: {
        success:
          verification.pipeline.success,

        verification,

        ...(verification.pipeline.reason && {
          message:
            verification.pipeline.reason,
        }),
      },
    };
  }
}