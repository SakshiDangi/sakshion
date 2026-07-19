import type {
  DigitalTwin
} from "../models/DigitalTwin";


import {
  MasteryCalculator
} from "./MasteryCalculator";



export class MasteryUpdater {



  static updateConcept(
    twin:DigitalTwin,
    conceptId:string,
    score:number
  ):DigitalTwin {


    const current =
      twin.mastery[conceptId];



    if(!current){

      throw new Error(
        `Concept ${conceptId} not found`
      );

    }



    const newMastery =
      MasteryCalculator.calculateNewMastery(
        current.mastery,
        score
      );



    return {


      ...twin,


      mastery:{


        ...twin.mastery,


        [conceptId]:{


          ...current,


          mastery:newMastery,


          attempts:
            current.attempts + 1,


          lastUpdated:
            new Date()

        }


      },


      updatedAt:
        new Date()


    };


  }


}