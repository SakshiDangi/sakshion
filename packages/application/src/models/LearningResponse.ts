import type {
  VerificationResponse,
} from "./VerificationResponse";

/**
 * Response returned after
 * completing a learning event.
 */
export interface LearningResponse {
  /**
   * Request status.
   */
  success: boolean;

  /**
   * Learning event identifier.
   */
  eventId: string;

  /**
   * Verification result.
   */
  verification: VerificationResponse;

  /**
   * Optional message.
   */
  message?: string;
}