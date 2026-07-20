import type {
  Lesson
} from "../models/Lesson";



export class LessonFormatter {



  static format(
    input:Partial<Lesson>
  ):Lesson {


    return {


      title:
        input.title ?? "Untitled Lesson",


      objective:
        input.objective ?? "Understand the concept",


      content:
        input.content ?? "",


      examples:
        input.examples ?? [],


      commonMistakes:
        input.commonMistakes ?? [],


      summary:
        input.summary ?? ""


    };


  }


}