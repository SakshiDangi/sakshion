import type { ConceptGraph } from "../models";

import { DFS } from "./DFS";
import { TraversalError } from "./TraversalError";

export class PrerequisiteTraversal {
  private readonly dfs = new DFS();

  constructor(
    private readonly graph: ConceptGraph,
  ) {}

  getDescendants(conceptId: string): string[] {
    return this.dfs
      .traverse(this.graph, conceptId)
      .slice(1);
  }

  getDependents(conceptId: string): string[] {
    return this.getDescendants(conceptId);
  }

  getPrerequisites(conceptId: string): string[] {
    if (!this.graph.nodes.has(conceptId)) {
      throw new TraversalError(
        `Unknown concept: ${conceptId}`,
      );
    }

    const prerequisites: string[] = [];

    for (const edge of this.graph.edges) {
      if (edge.target === conceptId) {
        prerequisites.push(edge.source);
      }
    }

    return prerequisites;
  }

  getAncestors(conceptId: string): string[] {
    if (!this.graph.nodes.has(conceptId)) {
      throw new TraversalError(
        `Unknown concept: ${conceptId}`,
      );
    }
  
    const visited = new Set<string>();
    const result: string[] = [];
  
    const visit = (id: string): void => {
      const prerequisites = this.getPrerequisites(id);
  
      for (const prerequisite of prerequisites) {
        if (visited.has(prerequisite)) {
          continue;
        }
  
        visited.add(prerequisite);
  
        visit(prerequisite);
  
        result.push(prerequisite);
      }
    };
  
    visit(conceptId);
  
    return result;
  }
}