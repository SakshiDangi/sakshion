import type {
  TutorContext
} from "../context/ContextBuilder";



export function buildQuestionPrompt(
  context:TutorContext
):string {


return `

Answer the student's question.

Current concept:

${context.currentConcept}


Student mastery:

${context.mastery}%


Question:

${context.studentQuestion}


Requirements:

- Explain reasoning.
- Avoid skipping steps.
- Use examples.
- Ask a follow-up question if useful.

`;

}