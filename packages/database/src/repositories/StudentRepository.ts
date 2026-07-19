import { eq } from "drizzle-orm";

import { db } from "../client";
import { students } from "../schema";

export type CreateStudent = typeof students.$inferInsert;
export type UpdateStudent = Partial<typeof students.$inferInsert>;
export type Student = typeof students.$inferSelect;

export class StudentRepository {

  async findById(id: string): Promise<Student | undefined> {
    const result = await db
      .select()
      .from(students)
      .where(eq(students.id, id));

    return result[0];
  }


  async findByEmail(email: string): Promise<Student | undefined> {
    const result = await db
      .select()
      .from(students)
      .where(eq(students.email, email));

    return result[0];
  }


  async findAll(): Promise<Student[]> {
    return db.select().from(students);
  }


  async findByGrade(grade: number): Promise<Student[]> {
    return db
      .select()
      .from(students)
      .where(eq(students.grade, grade));
  }


  async create(data: CreateStudent): Promise<Student> {
    const result = await db
      .insert(students)
      .values(data)
      .returning();

    const student = result[0];

    if (!student) {
      throw new Error("Failed to create student");
    }

    return student;
  }


  async update(
    id: string,
    data: UpdateStudent,
  ): Promise<Student | undefined> {

    const result = await db
      .update(students)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(students.id, id))
      .returning();

    return result[0];
  }


  async delete(id: string): Promise<void> {
    await db
      .delete(students)
      .where(eq(students.id, id));
  }
}