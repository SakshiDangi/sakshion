import {
 ROADMAP_CONSTANTS
} from "../utils/constants";

export interface EstimationInput {
  concepts: {

    conceptId:string;
    estimatedMinutes:number;
    completed:boolean;

  }[];

  sessionMinutes?:number;
}


export interface CompletionEstimate {
  remainingConcepts:number;
  totalMinutes:number
  sessions:number;
  estimatedDate:Date;
}

export class CompletionEstimator {

  static estimate(
    input:EstimationInput
  ):CompletionEstimate {

    const sessionMinutes =
      input.sessionMinutes ??
      ROADMAP_CONSTANTS.DEFAULT_SESSION_MINUTES;

    const remaining =
      input.concepts.filter(
        concept =>
          !concept.completed
      );

    const totalMinutes =
      remaining.reduce(
        (total, concept)=>
          total +
          concept.estimatedMinutes,
        0
      );

    const sessions =
      Math.ceil(
        totalMinutes /
        sessionMinutes
      );

    const estimatedDate =
      new Date();

    estimatedDate.setDate(
      estimatedDate.getDate()
      +
      sessions
    );

    return {

      remainingConcepts:
        remaining.length,

      totalMinutes,

      sessions,

      estimatedDate

    };

  }

}