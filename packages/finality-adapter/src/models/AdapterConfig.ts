import type {
  PrivateKey,
} from "@sakshion/finality";

export interface AdapterConfig {
  /**
   * Signing identity.
   */
  privateKey: PrivateKey;

  /**
   * Protocol domain.
   */
  domain: string;

  /**
   * Protocol identifier.
   */
  protocol: string;

  /**
   * Envelope TTL.
   */
  ttl: number;

  /**
   * Application metadata.
   */
  application: string;

  module: string;

  adapter: string;

  version: string;
}