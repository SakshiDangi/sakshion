import type {
  Roadmap
} from "../models/Roadmap";


import {
  RoadmapPlanner
} from "../planner/RoadmapPlanner";


import type {
  ConceptInput
} from "../planner/RoadmapPlanner";


import {
  RecommendationEngine
} from "../recommendation/RecommendationEngine";


import type {
  CandidateConcept
} from "../recommendation/RecommendationEngine";


import {
  CompletionEstimator
} from "../estimation/CompletionEstimator";


import type {
  EstimationInput,
  CompletionEstimate
} from "../estimation/CompletionEstimator";


import {
  RoadmapValidator
} from "../validation/RoadmapValidator";



export class RoadmapService {



  private roadmaps:
    Map<string,Roadmap>;



  constructor(){


    this.roadmaps =
      new Map();


  }




  /**
   * Generate first roadmap
   */
  generate(
    studentId:string,
    concepts:ConceptInput[]
  ):Roadmap {



    const roadmap =
      RoadmapPlanner.generate(
        studentId,
        concepts
      );



    this.save(
      roadmap
    );



    return roadmap;


  }





  /**
   * Get learner roadmap
   */
  get(
    studentId:string
  ):Roadmap | null {



    return (
      this.roadmaps.get(
        studentId
      )
      ??
      null
    );


  }





  /**
   * Update roadmap
   */
  update(
    roadmap:Roadmap
  ):Roadmap {


    const validation =
      RoadmapValidator.validate(
        roadmap
      );



    if(
      !validation.valid
    ){

      throw new Error(
        validation.errors.join(", ")
      );

    }



    this.save(
      roadmap
    );



    return roadmap;


  }





  /**
   * Recommend next concept
   */
  recommendNext(
    candidates:CandidateConcept[]
  ){


    return (
      RecommendationEngine.recommend(
        candidates
      )
    );


  }





  /**
   * Estimate completion
   */
  estimateCompletion(
    input:EstimationInput
  ):CompletionEstimate {


    return (
      CompletionEstimator.estimate(
        input
      )
    );


  }





  /**
   * Current lesson
   */
  getCurrentLesson(
    studentId:string
  ){


    const roadmap =
      this.get(
        studentId
      );



    if(
      !roadmap
    ){

      return null;

    }

    return (
      roadmap.currentConcept
    );
  }

  private save(
    roadmap:Roadmap
  ){

    this.roadmaps.set(

      roadmap.studentId,

      roadmap

    );
  }

}