import type {
  ConceptEdge,
  ConceptGraph,
  ConceptNode,
} from "../models";

import { GraphBuilderError } from "./GraphBuilderError";

export class GraphBuilder {
  build(
    nodes: ConceptNode[],
    edges: ConceptEdge[],
  ): ConceptGraph {
    const nodeMap = new Map<string, ConceptNode>();
    const adjacencyList = new Map<string, string[]>();

    for (const node of nodes) {
      if (nodeMap.has(node.id)) {
        throw new GraphBuilderError(
          `Duplicate concept id: ${node.id}`,
        );
      }

      nodeMap.set(node.id, node);
      adjacencyList.set(node.id, []);
    }

    for (const edge of edges) {
      if (!nodeMap.has(edge.source)) {
        throw new GraphBuilderError(
          `Missing source node: ${edge.source}`,
        );
      }

      if (!nodeMap.has(edge.target)) {
        throw new GraphBuilderError(
          `Missing target node: ${edge.target}`,
        );
      }

      adjacencyList.get(edge.source)!.push(edge.target);
    }

    return {
      nodes: nodeMap,
      edges,
      adjacencyList,
    };
  }
}