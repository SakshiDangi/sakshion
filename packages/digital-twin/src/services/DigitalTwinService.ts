import type {
  DigitalTwin
} from "../models/DigitalTwin";


import type {
  TwinCreationInput
} from "../state/TwinState";


import {
  TwinFactory
} from "../state/TwinFactory";


import {
  MasteryUpdater
} from "../mastery/MasteryUpdater";


import {
  ConfidenceUpdater
} from "../confidence/ConfidenceUpdater";


import {
  XPManager
} from "../xp/XPManager";


import {
  StreakManager,
  type StreakState
} from "../streak/StreakManager";


import {
  ProgressTracker
} from "../progress/ProgressTracker";


import {
  HistoryTracker
} from "../progress/HistoryTracker";


import {
  InsightGenerator,
  type LearnerInsight
} from "../insights/InsightGenerator";



export class DigitalTwinService {


  /**
   * Create initial learner twin
   */
  static create(
    input:TwinCreationInput
  ):DigitalTwin {


    return TwinFactory.create(
      input
    );

  }



  /**
   * Get learner state
   */
  static get(
    twin:DigitalTwin
  ):DigitalTwin {


    return twin;

  }



  /**
   * Update mastery after learning activity
   */
  static updateMastery(
    twin:DigitalTwin,
    conceptId:string,
    score:number
  ):DigitalTwin {


    return MasteryUpdater.updateConcept(
      twin,
      conceptId,
      score
    );

  }



  /**
   * Update confidence
   */
  static updateConfidence(
    twin:DigitalTwin,
    conceptId:string,
    success:boolean
  ):DigitalTwin {


    return ConfidenceUpdater.updateConcept(
      twin,
      conceptId,
      success
    );

  }



  /**
   * Award XP
   */
  static awardXP(
    twin:DigitalTwin,
    amount:number
  ):DigitalTwin {


    return {


      ...twin,


      xp:
        XPManager.update(
          twin.xp,
          amount
        ),


      updatedAt:
        new Date()


    };

  }



  /**
   * Update streak
   */
  static updateStreak(
    twin:DigitalTwin,
    streak:StreakState,
    date:string
  ):DigitalTwin {


    const updated =
      StreakManager.update(
        streak,
        date
      );


    return {


      ...twin,


      streak:updated,


      updatedAt:
        new Date()


    };


  }



  /**
   * Update statistics
   */
  static updateProgress(
    twin:DigitalTwin
  ):DigitalTwin {


    return ProgressTracker.updateStatistics(
      twin
    );

  }



  /**
   * Record history snapshot
   */
  static recordProgress(
    twin:DigitalTwin
  ):DigitalTwin {


    return HistoryTracker.record(
      twin
    );

  }



  /**
   * Generate learner insights
   */
  static generateInsights(
    twin:DigitalTwin
  ):LearnerInsight {


    return InsightGenerator.generate(
      twin
    );

  }


}