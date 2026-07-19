import type { ConceptEdge } from "./ConceptEdge";
import  type { ConceptNode } from "./ConceptNode";

export interface ConceptGraph {
  /**
   * All concepts indexed by ID.
   */
  nodes: Map<string, ConceptNode>;

  /**
   * All graph edges.
   */
  edges: ConceptEdge[];

  /**
   * Outgoing adjacency list.
   */
  adjacencyList: Map<string, string[]>;
}