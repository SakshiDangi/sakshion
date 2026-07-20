import type {
  PracticeFeedback,
  PracticeQuestion,
  PracticeSession,
} from "../models";

import type { PracticeEvaluation } from "../evaluator/PracticeEvaluation";
import type { MasteryUpdate } from "../mastery";
import type { PracticeEvent } from "../events";

/**
 * Result returned after completing a practice session.
 */
export interface PracticeServiceResult {
  session: PracticeSession;

  evaluation: PracticeEvaluation;

  mastery: MasteryUpdate;

  feedback: PracticeFeedback;

  event: PracticeEvent;
}