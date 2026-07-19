import { eq } from "drizzle-orm";

import { db } from "../client";
import { roadmaps } from "../schema";

export type Roadmap =
  typeof roadmaps.$inferSelect;

export type CreateRoadmap =
  typeof roadmaps.$inferInsert;

export type UpdateRoadmap =
  Partial<CreateRoadmap>;

export class RoadmapRepository {

  async findByStudent(
    studentId: string,
  ): Promise<Roadmap | undefined> {

    const result = await db
      .select()
      .from(roadmaps)
      .where(
        eq(
          roadmaps.studentId,
          studentId,
        ),
      );

    return result[0];
  }

  async findAll(): Promise<Roadmap[]> {

    return db
      .select()
      .from(roadmaps);

  }

  async create(
    data: CreateRoadmap,
  ): Promise<Roadmap> {

    const result = await db
      .insert(roadmaps)
      .values(data)
      .returning();

    const roadmap = result[0];

    if (!roadmap) {
      throw new Error(
        "Failed to create roadmap",
      );
    }

    return roadmap;
  }

  async update(
    studentId: string,
    data: UpdateRoadmap,
  ): Promise<Roadmap | undefined> {

    const result = await db
      .update(roadmaps)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        eq(
          roadmaps.studentId,
          studentId,
        ),
      )
      .returning();

    return result[0];
  }

  async upsert(
    data: CreateRoadmap,
  ): Promise<Roadmap> {
  
    const result = await db
      .insert(roadmaps)
      .values(data)
      .onConflictDoUpdate({
        target: roadmaps.studentId,
        set: {
          ...data,
          updatedAt: new Date(),
        },
      })
      .returning();
  
    const roadmap = result[0];
  
    if (!roadmap) {
      throw new Error(
        "Failed to upsert roadmap",
      );
    }
  
    return roadmap;
  }

  async delete(
    studentId: string,
  ): Promise<void> {

    await db
      .delete(roadmaps)
      .where(
        eq(
          roadmaps.studentId,
          studentId,
        ),
      );
  }

}