import {
  MasteryRepository,
} from "@sakshion/database";


import type {
  TutorResponse,
} from "../models";



/**
 * Application-level AI tutor service.
 *
 * Uses student mastery context
 * to generate personalized guidance.
 */
export class TutorService {


  private readonly masteryRepository =
    new MasteryRepository();



  /**
   * Ask tutor a question.
   */
  async ask(

    studentId: string,

    prompt: string,

  ): Promise<TutorResponse> {


    /**
     * Load student mastery.
     */
    const masteryRecords =
      await this.masteryRepository.findByStudent(
        studentId,
      );



    /**
     * Find weakest concepts.
     */
    const weakConcepts =
      masteryRecords
      .filter(
        record =>
          record.mastery < 70,
      )
      .sort(
        (
          a,
          b,
        ) =>
          a.mastery -
          b.mastery,
      );



    const weakestConcept =
      weakConcepts[0];



    /**
     * Build contextual response.
     */
    let response =
      `Let's work on: ${prompt}.`;



    if (weakestConcept) {

      response +=

        ` Your current focus should be ` +

        `${weakestConcept.conceptId} ` +

        `because your mastery is ` +

        `${weakestConcept.mastery}%.`;

    }



    return {


      success: true,


      response,


      suggestions: [

        "Explain in more detail",

        "Show another example",

        "Give me a practice question",

      ],


    };


  }


}