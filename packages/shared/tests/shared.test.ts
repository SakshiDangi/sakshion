import {
  describe,
  expect,
  it,
} from "vitest";

import {
  StudentSchema,
  Result,
  ok,
  err,
  clamp,
  createId,
  NotFoundError,
} from "../src";

describe("StudentSchema", () => {
  it("accepts valid data", () => {
    const validStudent = {
      createdAt:
        "2026-07-18T00:00:00.000Z",

      updatedAt:
        "2026-07-18T00:00:00.000Z",

      id:
        "student-test-1",

      profile: {
        displayName:
          "Test Student",

        email:
          "student@example.com",

        preferredLanguage:
          "en",

        timezone:
          "Asia/Kolkata",

        bio:
          "A test student for schema validation.",
      },

      summary: {
        id:
          "student-test-1",

        displayName:
          "Test Student",

        mastery:
          50,
      },

      metadata: {
        source:
          "unit-test",
      },
    };

    const result =
      StudentSchema.safeParse(
        validStudent
      );

    expect(result.success).toBe(true);
  });

  it("rejects invalid data", () => {
    const invalidStudent = {
      id: "",
    };

    const result =
      StudentSchema.safeParse(
        invalidStudent
      );

    expect(result.success).toBe(false);
  });
});

describe("Result", () => {
  it("creates a successful result", () => {
    const result: Result<number> =
      ok(42);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe(42);
    }
  });

  it("creates a failed result", () => {
    const error =
      new NotFoundError(
        "Student not found"
      );

    const result =
      err(error);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBe(error);

      expect(
        result.error.code
      ).toBe("NOT_FOUND");
    }
  });
});

describe("Utilities", () => {
  it("clamps numbers correctly", () => {
    expect(
      clamp(50, 0, 100)
    ).toBe(50);

    expect(
      clamp(-10, 0, 100)
    ).toBe(0);

    expect(
      clamp(150, 0, 100)
    ).toBe(100);
  });

  it("creates a non-empty ID", () => {
    const id = createId();

    expect(
      typeof id
    ).toBe("string");

    expect(
      id.length
    ).toBeGreaterThan(0);
  });
});