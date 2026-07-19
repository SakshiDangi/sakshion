import type {
  RoadmapNode
} from "./RoadmapNode";



import type {
  LearningStep
} from "./LearningStep";



export interface Roadmap {


  studentId:string;



  currentConcept:string | null;



  completedConcepts:string[];



  upcomingConcepts:RoadmapNode[];



  currentLesson:LearningStep | null;



  estimatedCompletion:Date | null;



  updatedAt:Date;


}