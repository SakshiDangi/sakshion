import type {
  AdapterResult,
} from "@sakshion/finality-adapter";

/**
 * Response returned after verifying
 * a learning event through the
 * Finality pipeline.
 */
export interface VerificationResponse {
  /**
   * Overall request status.
   */
  success: boolean;

  /**
   * Finality verification result.
   */
  verification: AdapterResult;

  /**
   * Optional message for UI.
   */
  message?: string;
}