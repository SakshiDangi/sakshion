import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import {
  type ConceptEdge,
  type ConceptNode,
  RelationshipType,
} from "../src/models";

import {
  GraphValidator,
  ValidationError,
} from "../src/validation";

describe("GraphValidator", () => {
  const builder = new GraphBuilder();

  const nodes: ConceptNode[] = [
    {
      id: "A",
      title: "A",
      description: "",
      subject: "Math",
      grade: 6,
      difficulty: 1,
      estimatedMinutes: 10,
      learningObjectives: [],
    },
    {
      id: "B",
      title: "B",
      description: "",
      subject: "Math",
      grade: 6,
      difficulty: 2,
      estimatedMinutes: 10,
      learningObjectives: [],
    },
    {
      id: "C",
      title: "C",
      description: "",
      subject: "Math",
      grade: 6,
      difficulty: 3,
      estimatedMinutes: 10,
      learningObjectives: [],
    },
  ];

  it("passes for a valid graph", () => {
    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship:
          RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "C",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const validator =
      new GraphValidator(graph);

    expect(() =>
      validator.validate(),
    ).not.toThrow();
  });

  it("throws for an empty graph", () => {
    const graph = builder.build([], []);

    const validator =
      new GraphValidator(graph);

    expect(() =>
      validator.validate(),
    ).toThrow(ValidationError);
  });

  it("throws when an adjacency list is missing", () => {
    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship:
          RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "C",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    graph.adjacencyList.delete("A");

    const validator =
      new GraphValidator(graph);

    expect(() =>
      validator.validate(),
    ).toThrow(ValidationError);
  });

  it("throws for duplicate edges", () => {
    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship:
          RelationshipType.PREREQUISITE,
      },
      {
        source: "A",
        target: "B",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const validator =
      new GraphValidator(graph);

    expect(() =>
      validator.validate(),
    ).toThrow(ValidationError);
  });

  it("throws when the graph contains a cycle", () => {
    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship:
          RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "C",
        relationship:
          RelationshipType.PREREQUISITE,
      },
      {
        source: "C",
        target: "A",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const validator =
      new GraphValidator(graph);

    expect(() =>
      validator.validate(),
    ).toThrow(ValidationError);
  });
});