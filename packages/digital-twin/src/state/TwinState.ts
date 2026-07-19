export interface InitialConceptAssessment {

  /**
   * Knowledge graph concept id
   */
  conceptId: string;


  /**
   * Initial mastery from diagnostic
   *
   * 0-100
   */
  mastery: number;

}


export interface TwinCreationInput {


  /**
   * Learner identifier
   */
  studentId: string;



  /**
   * Initial diagnostic results
   */
  assessments: InitialConceptAssessment[];

}