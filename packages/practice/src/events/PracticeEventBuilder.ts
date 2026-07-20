import type { PracticeEvent } from "./PracticeEvent";
import type { PracticeEventInput } from "./PracticeEventInput";

/**
 * Builds canonical practice completion events.
 */
export class PracticeEventBuilder {
  /**
   * Build a PracticeCompleted event.
   */
  build(
    input: PracticeEventInput,
  ): PracticeEvent {
    return {
      type: "PracticeCompleted",

      studentId: input.studentId,

      conceptId: input.conceptId,

      sessionId: input.sessionId,

      score: input.score,

      masteryBefore: input.masteryBefore,

      masteryAfter: input.masteryAfter,

      confidenceBefore: input.confidenceBefore,

      confidenceAfter: input.confidenceAfter,

      timestamp:
        input.timestamp ?? new Date(),
    };
  }
}