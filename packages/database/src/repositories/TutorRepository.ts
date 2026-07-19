import { and, desc, eq } from "drizzle-orm";

import { db } from "../client";
import { tutorSessions } from "../schema";

export type TutorSession =
  typeof tutorSessions.$inferSelect;

export type CreateTutorSession =
  typeof tutorSessions.$inferInsert;

export type UpdateTutorSession =
  Partial<CreateTutorSession>;

export class TutorRepository {

  async findById(
    id: string,
  ): Promise<TutorSession | undefined> {

    const result = await db
      .select()
      .from(tutorSessions)
      .where(
        eq(tutorSessions.id, id),
      );

    return result[0];
  }

  async findByStudent(
    studentId: string,
  ): Promise<TutorSession[]> {

    return db
      .select()
      .from(tutorSessions)
      .where(
        eq(
          tutorSessions.studentId,
          studentId,
        ),
      )
      .orderBy(
        desc(tutorSessions.createdAt),
      );
  }

  async findByConcept(
    conceptId: string,
  ): Promise<TutorSession[]> {

    return db
      .select()
      .from(tutorSessions)
      .where(
        eq(
          tutorSessions.conceptId,
          conceptId,
        ),
      )
      .orderBy(
        desc(tutorSessions.createdAt),
      );
  }

  async findByStudentAndConcept(
    studentId: string,
    conceptId: string,
  ): Promise<TutorSession[]> {

    return db
      .select()
      .from(tutorSessions)
      .where(
        and(
          eq(
            tutorSessions.studentId,
            studentId,
          ),
          eq(
            tutorSessions.conceptId,
            conceptId,
          ),
        ),
      )
      .orderBy(
        desc(tutorSessions.createdAt),
      );
  }

  async create(
    data: CreateTutorSession,
  ): Promise<TutorSession> {

    const result = await db
      .insert(tutorSessions)
      .values(data)
      .returning();

    const session = result[0];

    if (!session) {
      throw new Error(
        "Failed to create tutor session",
      );
    }

    return session;
  }

  async update(
    id: string,
    data: UpdateTutorSession,
  ): Promise<TutorSession | undefined> {

    const result = await db
      .update(tutorSessions)
      .set(data)
      .where(
        eq(
          tutorSessions.id,
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
      .delete(tutorSessions)
      .where(
        eq(
          tutorSessions.id,
          id,
        ),
      );
  }

}