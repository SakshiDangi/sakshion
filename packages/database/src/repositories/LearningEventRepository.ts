import {
  and,
  desc,
  eq,
} from "drizzle-orm";

import { db } from "../client";
import { learningEvents } from "../schema";

export type LearningEvent =
  typeof learningEvents.$inferSelect;

export type CreateLearningEvent =
  typeof learningEvents.$inferInsert;

export type UpdateLearningEvent =
  Partial<CreateLearningEvent>;

export class LearningEventRepository {

  async findById(
    id: string,
  ): Promise<LearningEvent | undefined> {

    const result = await db
      .select()
      .from(learningEvents)
      .where(
        eq(
          learningEvents.id,
          id,
        ),
      );

    return result[0];
  }

  async findByStudent(
    studentId: string,
  ): Promise<LearningEvent[]> {

    return db
      .select()
      .from(learningEvents)
      .where(
        eq(
          learningEvents.studentId,
          studentId,
        ),
      )
      .orderBy(
        desc(
          learningEvents.createdAt,
        ),
      );

  }

  async findByEventType(
    eventType: string,
  ): Promise<LearningEvent[]> {

    return db
      .select()
      .from(learningEvents)
      .where(
        eq(
          learningEvents.eventType,
          eventType,
        ),
      )
      .orderBy(
        desc(
          learningEvents.createdAt,
        ),
      );

  }

  async findByStudentAndEventType(
    studentId: string,
    eventType: string,
  ): Promise<LearningEvent[]> {

    return db
      .select()
      .from(learningEvents)
      .where(
        and(
          eq(
            learningEvents.studentId,
            studentId,
          ),
          eq(
            learningEvents.eventType,
            eventType,
          ),
        ),
      )
      .orderBy(
        desc(
          learningEvents.createdAt,
        ),
      );

  }

  async findVerified(): Promise<LearningEvent[]> {

    return db
      .select()
      .from(learningEvents)
      .where(
        eq(
          learningEvents.verified,
          true,
        ),
      )
      .orderBy(
        desc(
          learningEvents.createdAt,
        ),
      );

  }

  async create(
    data: CreateLearningEvent,
  ): Promise<LearningEvent> {

    const result = await db
      .insert(learningEvents)
      .values(data)
      .returning();

    const event = result[0];

    if (!event) {
      throw new Error(
        "Failed to create learning event",
      );
    }

    return event;

  }

  async update(
    id: string,
    data: UpdateLearningEvent,
  ): Promise<LearningEvent | undefined> {

    const result = await db
      .update(learningEvents)
      .set(data)
      .where(
        eq(
          learningEvents.id,
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
      .delete(learningEvents)
      .where(
        eq(
          learningEvents.id,
          id,
        ),
      );

  }

  async findUnverified(): Promise<LearningEvent[]> {

  return db
    .select()
    .from(learningEvents)
    .where(
      eq(
        learningEvents.verified,
        false,
      ),
    )
    .orderBy(
      desc(
        learningEvents.createdAt,
      ),
    );

}

async markVerified(
  id: string,
): Promise<LearningEvent | undefined> {

  const result = await db
    .update(learningEvents)
    .set({
      verified: true,
    })
    .where(
      eq(
        learningEvents.id,
        id,
      ),
    )
    .returning();

  return result[0];
}

}