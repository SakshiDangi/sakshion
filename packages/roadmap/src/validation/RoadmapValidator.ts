import type {
  Roadmap
} from "../models/Roadmap";


import {
  RoadmapNodeStatus
} from "../models/RoadmapNode";



export interface ValidationResult {


  valid:boolean;


  errors:string[];


}



export class RoadmapValidator {



  static validate(
    roadmap:Roadmap
  ):ValidationResult {


    const errors:string[] = [];



    this.checkDuplicates(
      roadmap,
      errors
    );


    this.checkCurrentConcept(
      roadmap,
      errors
    );


    this.checkLockedOrder(
      roadmap,
      errors
    );



    return {


      valid:
        errors.length === 0,


      errors


    };


  }






  private static checkDuplicates(
    roadmap:Roadmap,
    errors:string[]
  ){


    const ids =
      roadmap.upcomingConcepts
      .map(
        node =>
          node.conceptId
      );



    const unique =
      new Set(ids);



    if(
      unique.size !== ids.length
    ){

      errors.push(
        "Roadmap contains duplicate concepts"
      );

    }


  }






  private static checkCurrentConcept(
    roadmap:Roadmap,
    errors:string[]
  ){


    if(
      roadmap.currentConcept === null
    ){

      return;

    }



    const exists =
      roadmap.upcomingConcepts
      .some(
        node =>
          node.conceptId ===
          roadmap.currentConcept
      );



    if(!exists){

      errors.push(
        "Current concept does not exist in roadmap"
      );

    }


  }






  private static checkLockedOrder(
    roadmap:Roadmap,
    errors:string[]
  ){


    const currentIndex =
      roadmap.upcomingConcepts
      .findIndex(
        node =>
          node.status ===
          RoadmapNodeStatus.CURRENT
      );



    const lockedBefore =
      roadmap.upcomingConcepts
      .slice(
        0,
        currentIndex
      )
      .some(
        node =>
          node.status ===
          RoadmapNodeStatus.LOCKED
      );



    if(
      lockedBefore
    ){

      errors.push(
        "Locked concept appears before current learning step"
      );

    }
  }

}