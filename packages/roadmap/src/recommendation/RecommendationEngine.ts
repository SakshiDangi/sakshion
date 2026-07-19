import type {
  Recommendation
} from "../models/Recommendation";



export interface CandidateConcept {


  conceptId:string;


  mastery:number;


  confidence:number;


  difficulty:number;


}



export class RecommendationEngine {



  static recommend(
    candidates:CandidateConcept[]
  ):Recommendation | null {


    if(
      candidates.length === 0
    ){

      return null;

    }



    const ranked:Recommendation[] =
      candidates.map(
        concept=>{


          const score =
            this.calculateScore(
              concept
            );


          return {


            conceptId:
              concept.conceptId,


            score,


            reason:
              this.generateReason(
                concept
              )


          };


        }
      );



    ranked.sort(
      (a,b)=>
        b.score-a.score
    );



    return ranked[0] ?? null;


  }





  private static calculateScore(
    concept:CandidateConcept
  ):number {


    const masteryScore =
      (100 - concept.mastery)
      *
      0.4;



    const confidenceScore =
      (100 - concept.confidence)
      *
      0.2;



    const difficultyScore =
      concept.difficulty
      *
      0.2;



    const continuityScore =
      50
      *
      0.2;



    return Math.round(

      masteryScore
      +
      confidenceScore
      +
      difficultyScore
      +
      continuityScore

    );


  }





  private static generateReason(
    concept:CandidateConcept
  ):string {


    if(
      concept.mastery < 50
    ){

      return (
        `Recommended because ${concept.conceptId} ` +
        `has low mastery`
      );

    }



    if(
      concept.confidence < 50
    ){

      return (
        `Recommended because ${concept.conceptId} ` +
        `needs more confidence building`
      );

    }

    return (
      `Recommended based on learner progress`
    );

  }

}