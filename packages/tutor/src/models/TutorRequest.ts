export type LessonStage =

  | "INTRODUCTION"

  | "EXPLANATION"

  | "EXAMPLE"

  | "PRACTICE"

  | "SUMMARY";



export interface TutorRequest {


  studentId:string;


  conceptId:string;


  message:string;


  lessonStage:LessonStage;


}