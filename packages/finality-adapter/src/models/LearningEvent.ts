export enum LearningEventType {

  DIAGNOSTIC_COMPLETED =
    "DiagnosticCompleted",

  ROADMAP_GENERATED =
    "RoadmapGenerated",

  PRACTICE_COMPLETED =
    "PracticeCompleted",

  MASTERY_UPDATED =
    "MasteryUpdated",

  XP_AWARDED =
    "XPAwarded",
}


export interface LearningEvent {

  id:string;

  studentId:string;

  conceptId:string;

  type:
    LearningEventType;

  payload:
    Record<string, unknown>;

  timestamp:
    Date;
}