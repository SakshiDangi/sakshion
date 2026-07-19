export interface TutorMessage {


  role:
    | "student"
    | "tutor";


  content:string;


  timestamp:Date;


}



export interface TutorSession {


  sessionId:string;


  studentId:string;


  conceptId:string;


  startedAt:Date;


  completedAt:Date | null;


  messages:TutorMessage[];


}