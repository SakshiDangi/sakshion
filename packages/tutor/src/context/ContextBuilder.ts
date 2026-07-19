export interface TutorContext {


  studentId:string;

  conceptId:string;

  currentConcept:string;

  prerequisites:string[];

  mastery:number;

  confidence:number;

  completedConcepts:string[];

  learningGoal:string;

  studentQuestion:string;

}



export interface ContextBuilderInput {


  studentId:string;

  conceptId:string;

  conceptName:string;

  prerequisites:string[];

  mastery:number;

  confidence:number;

  completedConcepts:string[];

  learningGoal:string;

  studentQuestion:string;

}



export class ContextBuilder {



  static build(
    input:ContextBuilderInput
  ):TutorContext {


    return {

      studentId:
        input.studentId,

      conceptId:
        input.conceptId,

      currentConcept:
        input.conceptName,

      prerequisites:
        input.prerequisites,

      mastery:
        input.mastery,

      confidence:
        input.confidence,

      completedConcepts:
        input.completedConcepts,

      learningGoal:
        input.learningGoal,

      studentQuestion:
        input.studentQuestion

    };


  }


}