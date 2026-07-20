import {
  FinalityAdapterService,
} from "@sakshion/finality-adapter";

import type {
  LearningEvent,
  AdapterResult,
} from "@sakshion/finality-adapter";

export class LearningService {
  private readonly finality =
    new FinalityAdapterService();

  verifyLearningEvent(
    event: LearningEvent,
  ): AdapterResult {
    return this.finality.createVerification(
      event,
    );
  }
}