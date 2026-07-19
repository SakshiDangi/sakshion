import {
  RoadmapNodeStatus
} from "../models/RoadmapNode";


export interface Prerequisite {

  conceptId:string;

  requiredMastery:number;

}



export interface UnlockInput {

  conceptId:string;

  prerequisites:Prerequisite[];

  mastery:Record<string,number>;

}



export class UnlockEngine {


  static canUnlock(
    input:UnlockInput
  ):boolean {


    return input.prerequisites.every(
      prerequisite => {


        const mastery =
          input.mastery[
            prerequisite.conceptId
          ] ?? 0;


        return (
          mastery >=
          prerequisite.requiredMastery
        );


      }
    );


  }




  static getStatus(
    input:UnlockInput
  ):RoadmapNodeStatus {


    if(
      this.canUnlock(input)
    ){

      return RoadmapNodeStatus.AVAILABLE;

    }


    return RoadmapNodeStatus.LOCKED;


  }



}