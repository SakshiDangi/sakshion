import { and, eq, lt, gte } from "drizzle-orm";

import { db } from "../client";
import { studentMastery } from "../schema";


export type StudentMastery =
  typeof studentMastery.$inferSelect;


export type CreateMastery =
  typeof studentMastery.$inferInsert;


export type UpdateMastery =
  Partial<CreateMastery>;



export class MasteryRepository {


  async findByStudent(
    studentId: string,
  ): Promise<StudentMastery[]> {

    return db
      .select()
      .from(studentMastery)
      .where(
        eq(
          studentMastery.studentId,
          studentId,
        ),
      );
  }



  async findByStudentAndConcept(
    studentId: string,
    conceptId: string,
  ): Promise<StudentMastery | undefined> {


    const result = await db
      .select()
      .from(studentMastery)
      .where(
        and(
          eq(
            studentMastery.studentId,
            studentId,
          ),

          eq(
            studentMastery.conceptId,
            conceptId,
          ),
        ),
      );


    return result[0];
  }



  async findWeakConcepts(
    studentId: string,
    threshold = 50,
  ): Promise<StudentMastery[]> {


    return db
      .select()
      .from(studentMastery)
      .where(
        and(
          eq(
            studentMastery.studentId,
            studentId,
          ),

          lt(
            studentMastery.mastery,
            threshold,
          ),
        ),
      );
  }



  async findMasteredConcepts(
    studentId: string,
    threshold = 80,
  ): Promise<StudentMastery[]> {


    return db
      .select()
      .from(studentMastery)
      .where(
        and(
          eq(
            studentMastery.studentId,
            studentId,
          ),

          gte(
            studentMastery.mastery,
            threshold,
          ),
        ),
      );
  }



  async create(
    data: CreateMastery,
  ): Promise<StudentMastery> {


    const result = await db
      .insert(studentMastery)
      .values(data)
      .returning();


    const mastery = result[0];


    if (!mastery) {
      throw new Error(
        "Failed to create mastery record",
      );
    }


    return mastery;
  }



  async update(
    studentId: string,
    conceptId: string,
    data: UpdateMastery,
  ): Promise<StudentMastery | undefined> {


    const result = await db
      .update(studentMastery)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(
            studentMastery.studentId,
            studentId,
          ),

          eq(
            studentMastery.conceptId,
            conceptId,
          ),
        ),
      )
      .returning();


    return result[0];
  }



  async upsert(
    data: CreateMastery,
  ): Promise<StudentMastery> {


    const result = await db
      .insert(studentMastery)
      .values(data)
      .onConflictDoUpdate({

        target: [
          studentMastery.studentId,
          studentMastery.conceptId,
        ],

        set: {

          mastery: data.mastery,

          confidence: data.confidence,

          attempts: data.attempts,

          updatedAt: new Date(),

        },

      })
      .returning();



    const mastery = result[0];


    if (!mastery) {
      throw new Error(
        "Failed to upsert mastery record",
      );
    }


    return mastery;
  }


}