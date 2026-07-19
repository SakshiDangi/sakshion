import { eq, and } from "drizzle-orm";

import { db } from "../client";
import { concepts } from "../schema";


export type Concept = typeof concepts.$inferSelect;

export type CreateConcept =
  typeof concepts.$inferInsert;


export type UpdateConcept =
  Partial<CreateConcept>;



export class ConceptRepository {


  async findById(
    id: string,
  ): Promise<Concept | undefined> {

    const result = await db
      .select()
      .from(concepts)
      .where(eq(concepts.id, id));

    return result[0];
  }



  async findAll(): Promise<Concept[]> {

    return db
      .select()
      .from(concepts);

  }



  async findByTitle(
    title: string,
  ): Promise<Concept | undefined> {

    const result = await db
      .select()
      .from(concepts)
      .where(eq(concepts.title, title));

    return result[0];
  }



  async findBySubject(
    subject: string,
  ): Promise<Concept[]> {

    return db
      .select()
      .from(concepts)
      .where(eq(concepts.subject, subject));

  }



  async findByGrade(
    grade: number,
  ): Promise<Concept[]> {

    return db
      .select()
      .from(concepts)
      .where(eq(concepts.grade, grade));

  }



  async findByDifficulty(
    difficulty: number,
  ): Promise<Concept[]> {

    return db
      .select()
      .from(concepts)
      .where(eq(concepts.difficulty, difficulty));

  }



  async findBySubjectAndGrade(
    subject: string,
    grade: number,
  ): Promise<Concept[]> {

    return db
      .select()
      .from(concepts)
      .where(
        and(
          eq(concepts.subject, subject),
          eq(concepts.grade, grade),
        ),
      );

  }



  async create(
    data: CreateConcept,
  ): Promise<Concept> {


    const result = await db
      .insert(concepts)
      .values(data)
      .returning();


    const concept = result[0];


    if (!concept) {
      throw new Error(
        "Failed to create concept",
      );
    }


    return concept;
  }




  async update(
    id: string,
    data: UpdateConcept,
  ): Promise<Concept | undefined> {


    const result = await db
      .update(concepts)
      .set(data)
      .where(eq(concepts.id, id))
      .returning();


    return result[0];

  }




  async delete(
    id: string,
  ): Promise<void> {


    await db
      .delete(concepts)
      .where(eq(concepts.id, id));

  }

}