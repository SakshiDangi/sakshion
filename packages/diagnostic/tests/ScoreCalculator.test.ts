import {
  describe,
  expect,
  it,
} from "vitest";

import { ScoreCalculator } from "../src/scoring";

import type {
  ConceptScore,
} from "../src/models";

describe("ScoreCalculator", () => {
  const calculator =
    new ScoreCalculator();

  it("calculates percentage scores", () => {
    const concepts: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 8,
        incorrect: 2,
        score: 0,
        mastery: 0,
      },

      {
        conceptId: "division",
        correct: 3,
        incorrect: 1,
        score: 0,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        concepts,
      );

    expect(
      result[0]?.score,
    ).toBe(80);

    expect(
      result[1]?.score,
    ).toBe(75);
  });

  it("returns zero when no questions were answered", () => {
    const concepts: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 0,
        incorrect: 0,
        score: 0,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        concepts,
      );

    expect(
      result[0]?.score,
    ).toBe(0);
  });

  it("returns an empty array for empty input", () => {
    expect(
      calculator.calculate([]),
    ).toEqual([]);
  });

  it("calculates a perfect score", () => {
    const concepts: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 5,
        incorrect: 0,
        score: 0,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        concepts,
      );

    expect(
      result[0]?.score,
    ).toBe(100);
  });

  it("calculates a zero score", () => {
    const concepts: ConceptScore[] = [
      {
        conceptId: "fractions",
        correct: 0,
        incorrect: 5,
        score: 0,
        mastery: 0,
      },
    ];

    const result =
      calculator.calculate(
        concepts,
      );

    expect(
      result[0]?.score,
    ).toBe(0);
  });
});