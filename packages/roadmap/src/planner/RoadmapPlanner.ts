import type {
  Roadmap
} from "../models/Roadmap";


import {
  RoadmapNodeStatus
} from "../models/RoadmapNode";


import type {
  RoadmapNode
} from "../models/RoadmapNode";


import {
  RoadmapFactory
} from "./RoadmapFactory";



export interface ConceptInput {


  conceptId:string;


  mastery:number;


  estimatedMinutes:number;


}



export class RoadmapPlanner {



  static generate(
    studentId:string,
    concepts:ConceptInput[]
  ):Roadmap {


    let roadmap =
      RoadmapFactory.create({
        studentId
      });



    const nodes =
      concepts.map(
        concept=>{


          const status =
            concept.mastery >= 80
            ?
            RoadmapNodeStatus.COMPLETED
            :
            RoadmapNodeStatus.AVAILABLE;



          return {


            conceptId:
              concept.conceptId,


            status,


            priority:
              100 - concept.mastery,


            estimatedMinutes:
              concept.estimatedMinutes


          };


        }
      );



    const next =
      nodes
      .filter(
        node =>
          node.status !==
          RoadmapNodeStatus.COMPLETED
      )
      .sort(
        (a,b)=>
          b.priority-a.priority
      )[0];



    return {


      ...roadmap,


      upcomingConcepts:
        nodes,



      currentConcept:
        next?.conceptId ?? null,

      updatedAt:
        new Date()

    };
  }

}