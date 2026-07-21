import type {
  TutorResponse,
} from "../models";

export class TutorService {
  ask(
    prompt: string,
  ): TutorResponse {

    return {
      success: true,

      response:
        `Tutor response for: ${prompt}`,

      suggestions: [
        "Explain in more detail",
        "Show another example",
        "Give me a practice question",
      ],
    };
  }
}