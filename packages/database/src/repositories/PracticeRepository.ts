import { and, desc, eq } from "drizzle-orm";

import { db } from "../client";
import { practiceAttempts } from "../schema";

export type PracticeAttempt =
  typeof practiceAttempts.$inferSelect;

export type CreatePracticeAttempt =
  typeof practiceAttempts.$inferInsert;

export type UpdatePracticeAttempt =
  Partial<CreatePracticeAttempt>;

export class PracticeRepository {

  async findById(
    id: string,
  ): Promise<PracticeAttempt | undefined> {

    const result = await db
      .select()
      .from(practiceAttempts)
      .where(
        eq(practiceAttempts.id, id),
      );

    return result[0];
  }

  async findByStudent(
    studentId: string,
  ): Promise<PracticeAttempt[]> {

    return db
      .select()
      .from(practiceAttempts)
      .where(
        eq(
          practiceAttempts.studentId,
          studentId,
        ),
      )
      .orderBy(
        desc(practiceAttempts.completedAt),
      );
  }

  async findByConcept(
    conceptId: string,
  ): Promise<PracticeAttempt[]> {

    return db
      .select()
      .from(practiceAttempts)
      .where(
        eq(
          practiceAttempts.conceptId,
          conceptId,
        ),
      )
      .orderBy(
        desc(practiceAttempts.completedAt),
      );
  }

  async findByStudentAndConcept(
    studentId: string,
    conceptId: string,
  ): Promise<PracticeAttempt[]> {

    return db
      .select()
      .from(practiceAttempts)
      .where(
        and(
          eq(
            practiceAttempts.studentId,
            studentId,
          ),
          eq(
            practiceAttempts.conceptId,
            conceptId,
          ),
        ),
      )
      .orderBy(
        desc(practiceAttempts.completedAt),
      );
  }

  async create(
    data: CreatePracticeAttempt,
  ): Promise<PracticeAttempt> {

    const result = await db
      .insert(practiceAttempts)
      .values(data)
      .returning();

    const attempt = result[0];

    if (!attempt) {
      throw new Error(
        "Failed to create practice attempt",
      );
    }

    return attempt;
  }

  async update(
    id: string,
    data: UpdatePracticeAttempt,
  ): Promise<PracticeAttempt | undefined> {

    const result = await db
      .update(practiceAttempts)
      .set(data)
      .where(
        eq(
          practiceAttempts.id,
          id,
        ),
      )
      .returning();

    return result[0];
  }

  async delete(
    id: string,
  ): Promise<void> {

    await db
      .delete(practiceAttempts)
      .where(
        eq(
          practiceAttempts.id,
          id,
        ),
      );
  }

}