import type { PracticeAnswer } from "../models";

/**
 * Input for submitting a learner answer.
 */
export interface SubmitPracticeAnswerInput {
  /**
   * Existing practice session.
   */
  sessionId: string;

  /**
   * Learner answer.
   */
  answer: PracticeAnswer;
}