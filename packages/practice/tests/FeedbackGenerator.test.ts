import { describe, expect, it } from "vitest";

import { FeedbackGenerator } from "../src/feedback";

describe("FeedbackGenerator", () => {
  const generator =
    new FeedbackGenerator();

  function evaluation(score: number) {
    return {
      score,

      totalQuestions: 5,

      correctAnswers: 5,

      incorrectAnswers: 0,

      accuracy: score / 100,

      evaluations: [],

      weakQuestionIds:
        score === 100
          ? []
          : ["q2", "q4"],
    };
  }

  it("generates excellent feedback", () => {
    const feedback =
      generator.generate(
        evaluation(100),
      );

    expect(
      feedback.strengths.length,
    ).toBeGreaterThan(0);

    expect(
      feedback.mistakes,
    ).toHaveLength(0);
  });

  it("generates good feedback", () => {
    const feedback =
      generator.generate(
        evaluation(80),
      );

    expect(
      feedback.mistakes,
    ).toContain(
      'Review question "q2".',
    );
  });

  it("generates fair feedback", () => {
    const feedback =
      generator.generate(
        evaluation(60),
      );

    expect(
      feedback.recommendations.length,
    ).toBe(1);
  });

  it("generates improvement feedback", () => {
    const feedback =
      generator.generate(
        evaluation(20),
      );

    expect(
      feedback.mistakes.length,
    ).toBe(2);
  });
});