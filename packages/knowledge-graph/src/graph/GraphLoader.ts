import type { ConceptGraph } from "../models";
import { concepts } from "../data/concepts";
import { edges } from "../data/edges";

import { GraphBuilder } from "./GraphBuilder";

export class GraphLoader {
  private readonly builder = new GraphBuilder();

  load(): ConceptGraph {
    return this.builder.build(concepts, edges);
  }
}