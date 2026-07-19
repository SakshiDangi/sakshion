import type {
  DigitalTwin
} from "../models/DigitalTwin";


export interface LearnerInsight {

  strongestConcept:string | null;
  weakestConcept:string | null;
  recommendation:string;
}

export class InsightGenerator {


  static generate(
    twin:DigitalTwin
  ):LearnerInsight {


    const concepts =
      Object.values(
        twin.mastery
      );



    if(concepts.length === 0){

      return {

        strongestConcept:null,

        weakestConcept:null,

        recommendation:
          "Start learning to generate insights"

      };

    }



    const strongest =
      concepts.reduce(
        (a,b)=>
          a.mastery > b.mastery
          ? a
          : b
      );



    const weakest =
      concepts.reduce(
        (a,b)=>
          a.mastery < b.mastery
          ? a
          : b
      );



    return {


      strongestConcept:
        strongest.conceptId,



      weakestConcept:
        weakest.conceptId,



      recommendation:
        this.generateRecommendation(
          weakest.conceptId,
          weakest.mastery
        )


    };


  }




  private static generateRecommendation(
    conceptId:string,
    mastery:number
  ):string {


    if(mastery < 50){

      return `Focus on improving ${conceptId}`;

    }


    if(mastery < 80){

      return `Practice more ${conceptId}`;

    }
    return `Review ${conceptId} to maintain mastery`;

  }

}