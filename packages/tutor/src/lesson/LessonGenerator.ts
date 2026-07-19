import type {
  Lesson
} from "../models/Lesson";


import {
  LessonFormatter
} from "./LessonFormatter";



export interface LessonGenerationInput {


  title:string;


  objective:string;


  content:string;


  examples?:string[];


  commonMistakes?:string[];


  summary?:string;


}



export class LessonGenerator {



  static generate(
    input:LessonGenerationInput
  ):Lesson {


    return LessonFormatter.format(

      {

        title:
          input.title,


        objective:
          input.objective,


        content:
          input.content,


        examples:
          input.examples,


        commonMistakes:
          input.commonMistakes,


        summary:
          input.summary

      }

    );


  }


}