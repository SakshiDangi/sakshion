import type {
  TutorResponse
} from "../models/TutorResponse";



export interface ValidationResult {


  valid:boolean;


  errors:string[];


}





export class ResponseValidator {



  static validate(
    response:TutorResponse
  ):ValidationResult {



    const errors:string[] = [];



    if(
      !response
    ){

      errors.push(
        "Response is empty"
      );


      return {

        valid:false,

        errors

      };

    }





    if(
      response.lesson
    ){


      if(
        !response.lesson.title
      ){

        errors.push(
          "Lesson title missing"
        );

      }



      if(
        !response.lesson.content
        ||
        response.lesson.content.length < 20
      ){

        errors.push(
          "Lesson content too short"
        );

      }


    }





    if(
      !response.summary
      ||
      response.summary.trim().length === 0
    ){

      errors.push(
        "Summary missing"
      );

    }





    if(
      response.examples.length === 0
    ){

      errors.push(
        "No examples provided"
      );

    }





    return {


      valid:
        errors.length === 0,


      errors


    };


  }


}