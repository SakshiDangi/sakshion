import type {
  PrivateKey,
} from "@sakshion/finality";

import type {
  AdapterConfig,
} from "../models/AdapterConfig";

export const DEFAULT_ADAPTER_CONFIG: AdapterConfig = {
  /**
   * Deterministic development key.
   *
   * Replace with a secure key in production.
   */
  privateKey:
    (
      "0x" +
      "11".repeat(32)
    ) as PrivateKey,

  domain:
    "sakshion",

  protocol:
    "FINALITY",

  ttl:
    30_000,

  application:
    "sakshion",

  module:
    "learning",

  adapter:
    "finality-adapter",

  version:
    "0.0.1",
};