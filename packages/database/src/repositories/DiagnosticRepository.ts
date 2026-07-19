import {
  and,
  eq,
} from "drizzle-orm";


import { db } from "../client";

import {
  diagnosticQuestions,
  diagnosticResults,
} from "../schema";



export type DiagnosticQuestion =
  typeof diagnosticQuestions.$inferSelect;


export type CreateDiagnosticQuestion =
  typeof diagnosticQuestions.$inferInsert;



export type DiagnosticResult =
  typeof diagnosticResults.$inferSelect;


export type CreateDiagnosticResult =
  typeof diagnosticResults.$inferInsert;



export class DiagnosticRepository {



  // -----------------------------
  // Diagnostic Questions
  // -----------------------------


  async findQuestionById(
    id: string,
  ): Promise<DiagnosticQuestion | undefined> {


    const result = await db
      .select()
      .from(diagnosticQuestions)
      .where(
        eq(
          diagnosticQuestions.id,
          id,
        ),
      );


    return result[0];
  }




  async findQuestionsByConcept(
    conceptId: string,
  ): Promise<DiagnosticQuestion[]> {


    return db
      .select()
      .from(diagnosticQuestions)
      .where(
        eq(
          diagnosticQuestions.conceptId,
          conceptId,
        ),
      );
  }




  async findAllQuestions(): Promise<
    DiagnosticQuestion[]
  > {


    return db
      .select()
      .from(diagnosticQuestions);

  }




  async createQuestion(
    data: CreateDiagnosticQuestion,
  ): Promise<DiagnosticQuestion> {


    const result = await db
      .insert(diagnosticQuestions)
      .values(data)
      .returning();



    const question = result[0];


    if (!question) {
      throw new Error(
        "Failed to create diagnostic question",
      );
    }


    return question;
  }




  // -----------------------------
  // Diagnostic Results
  // -----------------------------


  async findResultById(
    id: string,
  ): Promise<DiagnosticResult | undefined> {


    const result = await db
      .select()
      .from(diagnosticResults)
      .where(
        eq(
          diagnosticResults.id,
          id,
        ),
      );


    return result[0];
  }





  async findResultsByStudent(
    studentId: string,
  ): Promise<DiagnosticResult[]> {


    return db
      .select()
      .from(diagnosticResults)
      .where(
        eq(
          diagnosticResults.studentId,
          studentId,
        ),
      );

  }





  async createResult(
    data: CreateDiagnosticResult,
  ): Promise<DiagnosticResult> {


    const result = await db
      .insert(diagnosticResults)
      .values(data)
      .returning();



    const diagnostic = result[0];


    if (!diagnostic) {
      throw new Error(
        "Failed to create diagnostic result",
      );
    }


    return diagnostic;

  }




  async findLatestResult(
    studentId: string,
  ): Promise<DiagnosticResult | undefined> {


    const result = await db
      .select()
      .from(diagnosticResults)
      .where(
        eq(
          diagnosticResults.studentId,
          studentId,
        ),
      )
      .orderBy(
        diagnosticResults.completedAt,
      )
      .limit(1);



    return result[0];

  }



}