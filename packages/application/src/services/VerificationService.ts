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
 * Orchestrates the Finality Adapter
 * and returns a UI-friendly response.
 */
export class VerificationService {
  private readonly adapter =
    new FinalityAdapterService();

  verify(
  event: LearningEvent,
): VerificationResponse {

  const verification =
    this.adapter.createVerification(
      event,
    );

  const pipeline =
    verification.pipeline;

  const response: VerificationResponse = {
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