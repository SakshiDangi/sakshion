import type {
  DigitalTwin
} from "../models/DigitalTwin";


export interface ValidationResult {

  valid:boolean;

  errors:string[];

}



export class TwinValidator {


  static validate(
    twin:DigitalTwin
  ):ValidationResult {


    const errors:string[] = [];



    this.validateMastery(
      twin,
      errors
    );



    this.validateConfidence(
      twin,
      errors
    );



    this.validateXP(
      twin,
      errors
    );



    this.validateStudent(
      twin,
      errors
    );



    return {


      valid:
        errors.length === 0,


      errors


    };


  }




  private static validateMastery(
    twin:DigitalTwin,
    errors:string[]
  ){


    Object.values(
      twin.mastery
    )
    .forEach(
      concept=>{


        if(
          concept.mastery < 0 ||
          concept.mastery > 100
        ){

          errors.push(
            `Invalid mastery for ${concept.conceptId}`
          );

        }


      }
    );


  }





  private static validateConfidence(
    twin:DigitalTwin,
    errors:string[]
  ){


    Object.values(
      twin.confidence
    )
    .forEach(
      concept=>{


        if(
          concept.confidence < 0 ||
          concept.confidence > 100
        ){

          errors.push(
            `Invalid confidence for ${concept.conceptId}`
          );

        }


      }
    );


  }





  private static validateXP(
    twin:DigitalTwin,
    errors:string[]
  ){


    if(twin.xp < 0){

      errors.push(
        "XP cannot be negative"
      );

    }


  }





  private static validateStudent(
    twin:DigitalTwin,
    errors:string[]
  ){


    if(
      !twin.studentId ||
      twin.studentId.trim()===""
    ){

      errors.push(
        "Student ID is required"
      );

    }

  }
}