import type { DigitalTwin } from "../models/DigitalTwin";

import type {
  TwinCreationInput
} from "./TwinState";



export class TwinFactory {


  static create(
    input: TwinCreationInput
  ): DigitalTwin {


    const mastery =
      Object.fromEntries(

        input.assessments.map(
          assessment => [

            assessment.conceptId,

            {
              conceptId:
                assessment.conceptId,

              mastery:
                assessment.mastery,

              attempts:0,

              lastUpdated:
                new Date()

            }

          ]

        )

      );



    return {


      studentId:
        input.studentId,



      mastery,



      confidence:{},



      learningState:{


        currentConcept:null,


        currentRoadmapNode:null,


        activeLesson:null,


        lastPractice:null,


        lastUpdated:
          new Date()

      },



      xp:0,



      streak:{


        current:0,


        longest:0,


        lastActiveDate:""


      },



      statistics:{


        totalPractices:0,


        completedConcepts:0,


        averageMastery:
          calculateAverageMastery(mastery)


      },



      history:[],


      updatedAt:
        new Date()


    };


  }


}



function calculateAverageMastery(
 mastery: Record<string, {mastery:number}>
):number {


 const values =
   Object.values(mastery)
   .map(
     item => item.mastery
   );



 if(values.length===0)
 {
   return 0;
 }



 return Math.round(

   values.reduce(
     (a,b)=>a+b,
     0
   )
   /
   values.length

 );


}