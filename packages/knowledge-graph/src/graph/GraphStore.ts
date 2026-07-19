import type { ConceptGraph } from "../models";

export class GraphStore {
  private graph: ConceptGraph | null = null;

  setGraph(graph: ConceptGraph): void {
    this.graph = graph;
  }

  getGraph(): ConceptGraph {
    if (!this.graph) {
      throw new Error("Graph has not been loaded.");
    }

    return this.graph;
  }

  getNode(id: string) {
    return this.getGraph().nodes.get(id);
  }

  hasNode(id: string): boolean {
    return this.getGraph().nodes.has(id);
  }

  clear(): void {
    this.graph = null;
  }
}