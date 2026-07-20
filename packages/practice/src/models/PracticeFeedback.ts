/**
 * Recommended next learning action after completing practice.
 */
export enum PracticeNextAction {
  REVIEW = "review",
  RETRY = "retry",
  CONTINUE = "continue",
  ADVANCE = "advance",
}

/**
 * Feedback generated after evaluating a practice session.
 */
export interface PracticeFeedback {
  /**
   * Concepts or skills demonstrated well.
   */
  strengths: readonly string[];

  /**
   * Mistakes or weak areas identified during practice.
   */
  mistakes: readonly string[];

  /**
   * Recommended actions for improvement.
   */
  recommendations: readonly string[];

  /**
   * Recommended next step in the learning journey.
   */
  nextAction: PracticeNextAction;
}