import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { eq } from "drizzle-orm";

import { db } from "../src/client";
import {
  students,
} from "../src/schema";
import {
  StudentRepository,
} from "../src/repositories";

const repository = new StudentRepository();

describe("StudentRepository", () => {

  beforeEach(async () => {

    await db
      .delete(students)
      .where(
        eq(
          students.email,
          "test@example.com",
        ),
      );

  });

  afterAll(async () => {

    await db
      .delete(students)
      .where(
        eq(
          students.email,
          "test@example.com",
        ),
      );

  });

  it("creates a student", async () => {

    const student = await repository.create({

      email: "test@example.com",

      name: "Test Student",

      grade: 6,

      avatar: null,

    });

    expect(student.email)
      .toBe("test@example.com");

    expect(student.name)
      .toBe("Test Student");

    expect(student.grade)
      .toBe(6);

  });

  it("finds a student by email", async () => {

    await repository.create({

      email: "test@example.com",

      name: "Test Student",

      grade: 6,

      avatar: null,

    });

    const student =
      await repository.findByEmail(
        "test@example.com",
      );

    expect(student).toBeDefined();

    expect(student?.email)
      .toBe("test@example.com");

  });

  it("updates a student", async () => {

    const created =
      await repository.create({

        email: "test@example.com",

        name: "Old Name",

        grade: 6,

        avatar: null,

      });

    const updated =
      await repository.update(
        created.id,
        {
          name: "New Name",
        },
      );

    expect(updated).toBeDefined();

    expect(updated?.name)
      .toBe("New Name");

  });

  it("deletes a student", async () => {

    const created =
      await repository.create({

        email: "test@example.com",

        name: "Delete Me",

        grade: 6,

        avatar: null,

      });

    await repository.delete(
      created.id,
    );

    const student =
      await repository.findById(
        created.id,
      );

    expect(student)
      .toBeUndefined();

  });

});