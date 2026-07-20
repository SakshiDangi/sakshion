import {
  createUnsignedEnvelope,
} from "@sakshion/finality";

import type {
  UnsignedEnvelope,
  ProtocolAddress,
  PublicKey,
} from "@sakshion/finality";

import type {
  LearningEvent,
} from "../models";

import type {
  AdapterConfig,
} from "../models/AdapterConfig";

export class EnvelopeBuilder {
  constructor(
    private readonly sender: ProtocolAddress,
    private readonly publicKey: PublicKey,
    private readonly config: AdapterConfig,
  ) {}

  build(
    event: LearningEvent,
  ): UnsignedEnvelope {

    return createUnsignedEnvelope({

      header: {

        messageId:
          event.id,

        domain:
          this.config.domain,

        messageKind:
          "REQUEST",

        sender:
          this.sender,

        publicKey:
          this.publicKey,

        timestamp:
          event.timestamp.getTime(),

        nonce: 1,

        sequence: 1,

        ttl: this.config.ttl,

        signatureAlgorithm:
          "SECP256K1",

        priority:
          "NORMAL",

        protocol:
           this.config.protocol,

        version:
          "1.0.0",
      },

      payload: {
        event,
      },

      metadata: {

        application:
          this.config.application,
        
        module:
          this.config.module,
        
        adapter:
          this.config.adapter,
        
        version:
          this.config.version,
      },
    });
  }
}