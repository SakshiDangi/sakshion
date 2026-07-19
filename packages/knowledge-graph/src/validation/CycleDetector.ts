import type { ConceptGraph } from "../models";

export class CycleDetector {
  constructor(
    private readonly graph: ConceptGraph,
  ) {}

  /**
   * Returns true if the graph contains a cycle.
   */
  hasCycle(): boolean {
    const visited = new Set<string>();
    const visiting = new Set<string>();

    for (const nodeId of this.graph.nodes.keys()) {
      if (this.visit(nodeId, visited, visiting)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Depth-first search.
   */
  private visit(
    nodeId: string,
    visited: Set<string>,
    visiting: Set<string>,
  ): boolean {
    // Back edge -> cycle
    if (visiting.has(nodeId)) {
      return true;
    }

    // Already processed
    if (visited.has(nodeId)) {
      return false;
    }

    visiting.add(nodeId);

    const neighbors =
      this.graph.adjacencyList.get(nodeId) ?? [];

    for (const neighbor of neighbors) {
      if (
        this.visit(
          neighbor,
          visited,
          visiting,
        )
      ) {
        return true;
      }
    }

    visiting.delete(nodeId);
    visited.add(nodeId);

    return false;
  }
}