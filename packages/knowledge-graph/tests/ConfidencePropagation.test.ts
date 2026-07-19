import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import {
  RelationshipType,
  type ConceptEdge,
  type ConceptNode,
  type StudentMastery,
} from "../src/models";
import { ConfidencePropagation } from "../src/propagation";

const nodes: ConceptNode[] = [
  {
    id: "division",
    title: "Division",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 1,
    estimatedMinutes: 20,
    learningObjectives: [],
  },
  {
    id: "fractions",
    title: "Fractions",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 2,
    estimatedMinutes: 20,
    learningObjectives: [],
  },
  {
    id: "equivalent-fractions",
    title: "Equivalent Fractions",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 3,
    estimatedMinutes: 20,
    learningObjectives: [],
  },
  {
    id: "percentages",
    title: "Percentages",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 4,
    estimatedMinutes: 20,
    learningObjectives: [],
  },
];

const edges: ConceptEdge[] = [
  {
    source: "division",
    target: "fractions",
    relationship: RelationshipType.PREREQUISITE,
  },
  {
    source: "fractions",
    target: "equivalent-fractions",
    relationship: RelationshipType.PREREQUISITE,
  },
  {
    source: "equivalent-fractions",
    target: "percentages",
    relationship: RelationshipType.PREREQUISITE,
  },
];

const mastery: StudentMastery[] = [
  {
    conceptId: "division",
    mastery: 85,
    confidence: 70,
  },
  {
    conceptId: "fractions",
    mastery: 70,
    confidence: 70,
  },
  {
    conceptId: "equivalent-fractions",
    mastery: 40,
    confidence: 55,
  },
  {
    conceptId: "percentages",
    mastery: 10,
    confidence: 20,
  },
];

describe("ConfidencePropagation", () => {
  const graph = new GraphBuilder().build(nodes, edges);
  const propagation =
    new ConfidencePropagation(graph);

  it("updates the selected concept", () => {
    const result = propagation.propagate(
      "equivalent-fractions",
      50,
      mastery,
    );

    expect(
      result.find(
        (m) => m.conceptId === "equivalent-fractions",
      )?.confidence,
    ).toBe(75);
  });

  it("updates prerequisites", () => {
    const result = propagation.propagate(
      "equivalent-fractions",
      50,
      mastery,
    );

    expect(
      result.find(
        (m) => m.conceptId === "fractions",
      )?.confidence,
    ).toBe(75);
  });

  it("updates dependents", () => {
    const result = propagation.propagate(
      "equivalent-fractions",
      50,
      mastery,
    );

    expect(
      result.find(
        (m) => m.conceptId === "percentages",
      )?.confidence,
    ).toBe(22.5);
  });

  it("does not mutate the original array", () => {
    propagation.propagate(
      "equivalent-fractions",
      50,
      mastery,
    );

    expect(
      mastery.find(
        (m) => m.conceptId === "equivalent-fractions",
      )?.confidence,
    ).toBe(55);
  });

  it("clamps confidence to 100", () => {
    const result = propagation.propagate(
      "equivalent-fractions",
      200,
      mastery,
    );

    expect(
      result.find(
        (m) => m.conceptId === "equivalent-fractions",
      )?.confidence,
    ).toBe(100);
  });

  it("throws for unknown concept", () => {
    expect(() =>
      propagation.propagate(
        "unknown",
        50,
        mastery,
      ),
    ).toThrow();
  });
});