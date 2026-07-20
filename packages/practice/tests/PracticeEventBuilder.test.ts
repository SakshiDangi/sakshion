import { describe, expect, it } from "vitest";

import { PracticeEventBuilder } from "../src/events";

describe("PracticeEventBuilder", () => {
  it("builds a PracticeCompleted event", () => {
    const builder =
      new PracticeEventBuilder();

    const timestamp =
      new Date("2026-01-01T00:00:00Z");

    const event =
      builder.build({
        studentId: "student-1",

        conceptId: "fractions",

        sessionId: "session-1",

        score: 80,

        masteryBefore: 50,

        masteryAfter: 57,

        confidenceBefore: 40,

        confidenceAfter: 44,

        timestamp,
      });

    expect(event).toEqual({
      type: "PracticeCompleted",

      studentId: "student-1",

      conceptId: "fractions",

      sessionId: "session-1",

      score: 80,

      masteryBefore: 50,

      masteryAfter: 57,

      confidenceBefore: 40,

      confidenceAfter: 44,

      timestamp,
    });
  });

  it("uses current time when timestamp is omitted", () => {
    const builder =
      new PracticeEventBuilder();

    const before = Date.now();

    const event =
      builder.build({
        studentId: "student-1",

        conceptId: "fractions",

        sessionId: "session-1",

        score: 100,

        masteryBefore: 60,

        masteryAfter: 70,

        confidenceBefore: 50,

        confidenceAfter: 55,
      });

    const after = Date.now();

    expect(
      event.timestamp.getTime(),
    ).toBeGreaterThanOrEqual(before);

    expect(
      event.timestamp.getTime(),
    ).toBeLessThanOrEqual(after);
  });
});