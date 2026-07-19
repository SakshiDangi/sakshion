import {
  describe,
  expect,
  it,
} from "vitest";

import { MasteryCalculator } from "../src/scoring";

import type {
  ConceptScore,
} from "../src/models";

describe("MasteryCalculator", () => {
  const calculator =
    new MasteryCalculator();

  it("maps 100% to 95 mastery", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 5,
        incorrect: 0,
        score: 100,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        scores,
      );

    expect(
      result[0]?.mastery,
    ).toBe(95);
  });

  it("maps 80% to 75 mastery", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 4,
        incorrect: 1,
        score: 80,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        scores,
      );

    expect(
      result[0]?.mastery,
    ).toBe(75);
  });

  it("maps 50% to 45 mastery", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 1,
        incorrect: 1,
        score: 50,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        scores,
      );

    expect(
      result[0]?.mastery,
    ).toBe(45);
  });

  it("maps 0% to 5 mastery", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 0,
        incorrect: 4,
        score: 0,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        scores,
      );

    expect(
      result[0]?.mastery,
    ).toBe(5);
  });

  it("preserves score values", () => {
    const scores: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 3,
        incorrect: 1,
        score: 75,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        scores,
      );

    expect(
      result[0]?.score,
    ).toBe(75);

    expect(
      result[0]?.mastery,
    ).toBe(65);
  });

  it("returns empty array for empty input", () => {
    expect(
      calculator.calculate([]),
    ).toEqual([]);
  });
});