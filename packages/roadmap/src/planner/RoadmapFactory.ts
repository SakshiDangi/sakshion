import type {
  Roadmap
} from "../models/Roadmap";



export interface RoadmapCreationInput {

  studentId:string;

}



export class RoadmapFactory {



  static create(
    input:RoadmapCreationInput
  ):Roadmap {


    return {


      studentId:
        input.studentId,


      currentConcept:
        null,


      completedConcepts:
        [],


      upcomingConcepts:
        [],


      currentLesson:
        null,

      estimatedCompletion:
        null,

      updatedAt:
        new Date()
    };
  }
}