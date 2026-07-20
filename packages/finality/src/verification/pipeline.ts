import type {
  Envelope,
} from "../base/envelope.js";

import {
  verifyEnvelope,
} from "./verifier.js";

import type {
  ProtocolVerificationResult,
  VerifierContext,
} from "./verifier.js";

import {
  detectReplay,
} from "../replay/replay-detector.js";

import type {
  ReplayDetectorContext,
  ReplayDetectionResult,
} from "../replay/replay-detector.js";

/* =========================================
 * PIPELINE STAGES
 * =======================================*/

export enum PipelineStage {
  /**
   * Envelope entered pipeline.
   */
  RECEIVED =
    "RECEIVED",

  /**
   * Envelope successfully verified.
   */
  VERIFIED =
    "VERIFIED",

  /**
   * Envelope rejected.
   */
  REJECTED =
    "REJECTED",

  /**
   * Reserved for execution.
   */
  EXECUTING =
    "EXECUTING",

  /**
   * Reserved for settlement.
   */
  SETTLED =
    "SETTLED",

  /**
   * Reserved for finalized state.
   */
  FINALIZED =
    "FINALIZED",
}

/* =========================================
 * PIPELINE CONTEXT
 * =======================================*/

export interface PipelineContext {

  /**
   * Signature / timestamp /
   * nonce verification.
   */
  verifier:
    VerifierContext;

  /**
   * Replay detection runtime.
   */
  replay?:
    ReplayDetectorContext;
}

/* =========================================
 * PIPELINE RESULT
 * =======================================*/

export interface PipelineResult {

  /**
   * Overall pipeline success.
   */
  success:
    boolean;

  /**
   * Current pipeline stage.
   */
  stage:
    PipelineStage;

  /**
   * Verification result.
   */
  verification:
    ProtocolVerificationResult;

  /**
   * Replay detection result.
   */
  replay?:
    ReplayDetectionResult;

  /**
   * Human-readable diagnostics.
   */
  reason?:
    string;

  /**
   * Processing timestamp.
   */
  processedAt:
    number;
}

/* =========================================
 * VERIFICATION PIPELINE
 * =======================================*/

/**
 * Executes deterministic protocol pipeline.
 *
 * Current flow:
 *
 * RECEIVED
 *   ↓
 * VERIFY
 *   ↓
 * REPLAY
 *   ↓
 * SUCCESS
 *
 * Future:
 *
 * VERIFY
 *   ↓
 * REPLAY
 *   ↓
 * EXECUTION
 *   ↓
 * SETTLEMENT
 *   ↓
 * FINALIZED
 */
export function executeVerificationPipeline(
  envelope: Envelope,

  context: PipelineContext,
): PipelineResult {

  /**
   * Pipeline start time.
   */
  const processedAt =
    context.verifier.currentTime;

  /**
   * Initial state.
   */
  let stage =
    PipelineStage.RECEIVED;

  /* =====================================
   * STEP 1
   * VERIFY ENVELOPE
   * ===================================*/

  const verification =
    verifyEnvelope(
      envelope,
      context.verifier,
    );

  /**
   * Reject invalid envelopes.
   */
  if (
    !verification.success
  ) {
    stage =
      PipelineStage.REJECTED;

    return {

      success: false,

      stage,

      verification,

      reason:
        verification.reason,

      processedAt,
    };
  }

  /* =====================================
   * STEP 2
   * VERIFICATION SUCCEEDED
   * ===================================*/

  stage =
    PipelineStage.VERIFIED;

  /* =====================================
   * STEP 3
   * REPLAY DETECTION
   * ===================================*/

  let replay:
    ReplayDetectionResult | undefined;
  
  if (context.replay) {
  
    replay =
      detectReplay(
        envelope,
        context.replay,
      );
  }

  /**
   * Reject replay attacks.
   */
  if (
    replay &&
    !replay.success
  ) {
    return {

      success: false,

      stage,

      verification,

      replay,

      reason:
        replay.reason,

      processedAt,
    };
  }

  /* =====================================
   * SUCCESS
   * ===================================*/

  return {

    success: true,

    stage,

    verification,

    replay,

    processedAt,
  };
}