import type {
  DigitalTwin
} from "../models/DigitalTwin";


export class HistoryTracker {


  static createSnapshot(
    twin:DigitalTwin
  ):DigitalTwin["history"][number] {


    return {


      timestamp:
        new Date(),


      masteryAverage:
        twin.statistics.averageMastery,


      completedConcepts:
        twin.statistics.completedConcepts,


      xp:
        twin.xp


    };


  }



  static record(
    twin:DigitalTwin
  ):DigitalTwin {


    const snapshot =
      this.createSnapshot(twin);



    return {


      ...twin,


      history:[

        ...twin.history,

        snapshot

      ],


      updatedAt:
        new Date()


    };


  }


}