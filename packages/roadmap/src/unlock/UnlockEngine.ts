import {
  RoadmapNodeStatus
} from "../models/RoadmapNode";

import {
 ROADMAP_CONSTANTS
} from "../utils/constants";

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
          ROADMAP_CONSTANTS.UNLOCK_MASTERY_THRESHOLD
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