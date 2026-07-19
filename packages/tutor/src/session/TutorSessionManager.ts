import type {
  TutorSession,
  TutorMessage
} from "../models/TutorSession";



export interface CreateSessionInput {


  studentId:string;


  conceptId:string;


}



export class TutorSessionManager {



  private sessions:
    Map<string,TutorSession>;



  constructor(){


    this.sessions =
      new Map();


  }




  /**
   * Create new tutor session
   */
  create(
    input:CreateSessionInput
  ):TutorSession {



    const session:TutorSession = {


      sessionId:
        crypto.randomUUID(),


      studentId:
        input.studentId,


      conceptId:
        input.conceptId,


      startedAt:
        new Date(),


      completedAt:
        null,


      messages:[]


    };



    this.sessions.set(

      session.sessionId,

      session

    );



    return session;


  }





  /**
   * Get session
   */
  get(
    sessionId:string
  ):TutorSession | null {



    return (

      this.sessions.get(
        sessionId
      )
      ??
      null

    );


  }





  /**
   * Add message
   */
  append(
    sessionId:string,
    message:TutorMessage
  ):TutorSession {



    const session =
      this.sessions.get(
        sessionId
      );



    if(
      !session
    ){

      throw new Error(
        "Tutor session not found"
      );

    }



    const updated: TutorSession = {


      ...session,


      messages:[

        ...session.messages,

        message

      ]


    };



    this.sessions.set(

      sessionId,

      updated

    );



    return updated;


  }





  /**
   * Complete session
   */
  complete(
    sessionId:string
  ):TutorSession {



    const session =
      this.sessions.get(
        sessionId
      );



    if(
      !session
    ){

      throw new Error(
        "Tutor session not found"
      );

    }



    const updated: TutorSession = {


      ...session,


      completedAt:
        new Date()


    };



    this.sessions.set(

      sessionId,

      updated

    );



    return updated;


  }


}