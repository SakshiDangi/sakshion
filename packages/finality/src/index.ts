/*
 * Envelope
 */

export {
  createEnvelope,
  createUnsignedEnvelope,
} from "./base/envelope.js";

export type {
  Envelope,
  UnsignedEnvelope,
} from "./base/envelope.js";

/*
 * Payload
 */

export {
  canonicalizePayload,
  hashPayload,
} from "./payload/index.js";

/*
 * Signatures
 */

export {
  signDigest,
  signEnvelope,
  verifyDigestSignature,
  derivePublicKey,
} from "./crypto/signatures.js";


export {
  deriveAddress,
} from "./crypto/identity.js";

/*
 * Verification
 */

export {
  executeVerificationPipeline,
} from "./verification/pipeline.js";

export type {
  PipelineResult,
  PipelineContext,
} from "./verification/pipeline.js";

export {
  verifyEnvelope,
} from "./verification/verifier.js";

export type {
  VerifierContext,
  ProtocolVerificationResult,
} from "./verification/verifier.js";

/*
 * Replay
 */

export {
  detectReplay,
} from "./replay/replay-detector.js";

/*
 * Types
 */

export type {
  PublicKey,
  PrivateKey,
  SignatureHex,
  HashDigest,
  ProtocolAddress,
} from "./base/primitives.js";

/*
 * Replay Storage
 */

export {
  InMemoryReplayStore,
} from "./storage/replay-store.js";

export type {
  ReplayStore,
  ReplayRecord,
  NonceRecord,
} from "./storage/replay-store.js";