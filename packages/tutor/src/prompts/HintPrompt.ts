import type {
  TutorContext
} from "../context/ContextBuilder";



export function buildHintPrompt(
  context:TutorContext,
  level:number
):string {


return `

Generate a hint for the learner.


Concept:

${context.currentConcept}


Student question:

${context.studentQuestion}


Hint level:

${level}


Rules:

Level 1:
Give a small clue.


Level 2:
Give a stronger direction.


Level 3:
Almost explain the solution,
but still encourage thinking.


Do not directly give the answer.

`;

}