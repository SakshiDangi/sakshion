import {
  executeVerificationPipeline,
  signEnvelope,
  InMemoryReplayStore,
  derivePublicKey,
  deriveAddress,
} from "@sakshion/finality";

import type {
  Envelope,
  PipelineContext,
  PublicKey,
  ProtocolAddress,
} from "@sakshion/finality";

import {
  EnvelopeBuilder,
} from "../builders";

import {
  DEFAULT_ADAPTER_CONFIG,
} from "../config/defaultConfig";

import type {
  LearningEvent,
  AdapterResult,
} from "../models";

import type { AdapterConfig, } from "../models/AdapterConfig";

export class FinalityAdapterService {
  /**
   * Runtime signing identity.
   */
  private readonly publicKey: PublicKey;

  /**
   * Protocol sender address.
   */
  private readonly address: ProtocolAddress;

  /**
   * Replay protection store.
   */
  private readonly replayStore =
    new InMemoryReplayStore();

  /**
   * Envelope builder.
   */
  private readonly builder: EnvelopeBuilder;

  constructor(
    private readonly config: AdapterConfig =
      DEFAULT_ADAPTER_CONFIG,
  ) {
    /**
     * Derive runtime identity.
     */
    this.publicKey =
      derivePublicKey(
        config.privateKey,
      );

    this.address =
      deriveAddress(
        this.publicKey,
      );

    /**
     * Initialize builder.
     */
    this.builder =
      new EnvelopeBuilder(
        this.address,
        this.publicKey,
        config,
      );
  }

  /**
   * Converts a learning event into
   * a signed and verified Finality envelope.
   */
  createVerification(
    event: LearningEvent,
  ): AdapterResult {

    /**
     * Build unsigned envelope.
     */
    const unsigned =
      this.builder.build(
        event,
      );

    /**
     * Sign envelope.
     */
    const signature =
      signEnvelope(
        unsigned,
        this.config.privateKey,
      );

    /**
     * Create signed envelope.
     */
    const envelope: Envelope = {
      ...unsigned,
      signature,
    };

    /**
     * Verification context.
     */
    const context: PipelineContext = {
      verifier: {
        publicKey:
          this.publicKey,

        currentTime:
          Date.now(),

        latestNonce:
          0,
      },

      replay: {
        store:
          this.replayStore,

        currentTime:
          Date.now(),
      },
    };

    /**
     * Execute protocol pipeline.
     */
    const pipeline =
      executeVerificationPipeline(
        envelope,
        context,
      );

    return {
      envelope,
      pipeline,
    };
  }
}