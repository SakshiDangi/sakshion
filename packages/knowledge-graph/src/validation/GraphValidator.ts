import type { ConceptGraph } from "../models";

import { CycleDetector } from "./CycleDetector";
import { ValidationError } from "./ValidationError";

export class GraphValidator {
  constructor(
    private readonly graph: ConceptGraph,
  ) {}

  /**
   * Validates the entire knowledge graph.
   *
   * Throws ValidationError if any validation fails.
   */
  validate(): void {
    this.validateNodes();
    this.validateEdges();
    this.validateAdjacency();
    this.validateDuplicateEdges();
    this.validateCycles();
  }

  /**
   * Ensures the graph contains nodes and
   * that every ConceptNode has a unique ID.
   */
  private validateNodes(): void {
    if (this.graph.nodes.size === 0) {
      throw new ValidationError(
        "Knowledge graph contains no concepts.",
      );
    }

    const ids = new Set<string>();

    for (const node of this.graph.nodes.values()) {
      if (ids.has(node.id)) {
        throw new ValidationError(
          `Duplicate concept ID: ${node.id}`,
        );
      }

      ids.add(node.id);
    }
  }

  /**
   * Ensures every edge references
   * valid source and target concepts.
   */
  private validateEdges(): void {
    for (const edge of this.graph.edges) {
      if (!this.graph.nodes.has(edge.source)) {
        throw new ValidationError(
          `Unknown source concept: ${edge.source}`,
        );
      }

      if (!this.graph.nodes.has(edge.target)) {
        throw new ValidationError(
          `Unknown target concept: ${edge.target}`,
        );
      }
    }
  }

  /**
   * Ensures every node has an adjacency entry,
   * even if it has no outgoing edges.
   */
  private validateAdjacency(): void {
    for (const nodeId of this.graph.nodes.keys()) {
      if (!this.graph.adjacencyList.has(nodeId)) {
        throw new ValidationError(
          `Missing adjacency list for concept: ${nodeId}`,
        );
      }
    }
  }

  /**
   * Prevent duplicate graph edges.
   *
   * Example:
   * A -> B
   * A -> B
   */
  private validateDuplicateEdges(): void {
    const seen = new Set<string>();

    for (const edge of this.graph.edges) {
      const key =
        `${edge.source}:${edge.relationship}:${edge.target}`;

      if (seen.has(key)) {
        throw new ValidationError(
          `Duplicate edge detected: ${key}`,
        );
      }

      seen.add(key);
    }
  }

  /**
   * Ensures the graph is acyclic.
   */
  private validateCycles(): void {
    const detector =
      new CycleDetector(this.graph);

    if (detector.hasCycle()) {
      throw new ValidationError(
        "Knowledge graph contains a cycle.",
      );
    }
  }
}