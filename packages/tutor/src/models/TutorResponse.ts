import type {
  Lesson
} from "./Lesson";


import type {
  Hint
} from "./Hint";



export interface TutorResponse {


  lesson:Lesson | null;


  examples:string[];


  hint:Hint | null;


  summary:string;


  nextAction:string;


}