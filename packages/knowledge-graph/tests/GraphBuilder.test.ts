import { describe, expect, it } from "vitest";

import {
  GraphBuilder,
  GraphBuilderError,
} from "../src/graph";

import {
  type ConceptEdge,
  type ConceptNode,
  RelationshipType,
} from "../src/models";

describe("GraphBuilder", () => {
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

  it("builds a graph successfully", () => {
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

    const graph =
      builder.build(nodes, edges);

    expect(graph.nodes.size).toBe(3);
    expect(graph.edges).toHaveLength(2);
    expect(
      graph.adjacencyList.get("A"),
    ).toEqual(["B"]);
    expect(
      graph.adjacencyList.get("B"),
    ).toEqual(["C"]);
    expect(
      graph.adjacencyList.get("C"),
    ).toEqual([]);
  });

  it("creates empty adjacency lists for leaf nodes", () => {
    const graph =
      builder.build(nodes, []);

    expect(
      graph.adjacencyList.get("A"),
    ).toEqual([]);

    expect(
      graph.adjacencyList.get("B"),
    ).toEqual([]);

    expect(
      graph.adjacencyList.get("C"),
    ).toEqual([]);
  });

  it("throws when the source node does not exist", () => {
    const edges: ConceptEdge[] = [
      {
        source: "X",
        target: "A",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    expect(() =>
      builder.build(nodes, edges),
    ).toThrow(GraphBuilderError);
  });

  it("throws when the target node does not exist", () => {
    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "X",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    expect(() =>
      builder.build(nodes, edges),
    ).toThrow(GraphBuilderError);
  });

  it("builds a branching graph", () => {
    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship:
          RelationshipType.PREREQUISITE,
      },
      {
        source: "A",
        target: "C",
        relationship:
          RelationshipType.PREREQUISITE,
      },
    ];

    const graph =
      builder.build(nodes, edges);

    expect(
      graph.adjacencyList.get("A"),
    ).toEqual(["B", "C"]);

    expect(
      graph.adjacencyList.get("B"),
    ).toEqual([]);

    expect(
      graph.adjacencyList.get("C"),
    ).toEqual([]);
  });
});