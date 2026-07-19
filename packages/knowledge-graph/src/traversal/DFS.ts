import type { ConceptGraph } from "../models";

export class DFS {
  traverse(
    graph: ConceptGraph,
    start: string,
  ): string[] {
    if (!graph.nodes.has(start)) {
      throw new Error(`Unknown concept: ${start}`);
    }

    const visited = new Set<string>();
    const result: string[] = [];

    const visit = (nodeId: string): void => {
      if (visited.has(nodeId)) {
        return;
      }

      visited.add(nodeId);
      result.push(nodeId);

      const neighbors =
        graph.adjacencyList.get(nodeId) ?? [];

      for (const neighbor of neighbors) {
        visit(neighbor);
      }
    };

    visit(start);

    return result;
  }
}