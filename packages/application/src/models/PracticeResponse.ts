import type {
  VerificationResponse,
} from "./VerificationResponse";

/**
 * Response returned after a
 * practice session completes.
 */
export interface PracticeResponse {
  /**
   * Overall operation status.
   */
  success: boolean;

  /**
   * Student score.
   */
  score: number;

  /**
   * XP earned.
   */
  experience: number;

  /**
   * Updated mastery.
   */
  mastery: number;

  /**
   * Finality verification.
   */
  verification: VerificationResponse;

  /**
   * Optional feedback.
   */
  feedback?: string;
}