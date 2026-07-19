import type { ConceptGraph } from "../models";

export class BFS {
  traverse(
    graph: ConceptGraph,
    start: string,
  ): string[] {
    if (!graph.nodes.has(start)) {
      throw new Error(`Unknown concept: ${start}`);
    }

    const visited = new Set<string>();
    const queue: string[] = [start];
    const result: string[] = [];

    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift()!;

      result.push(current);

      const neighbors =
        graph.adjacencyList.get(current) ?? [];

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
          continue;
        }

        visited.add(neighbor);
        queue.push(neighbor);
      }
    }

    return result;
  }
}