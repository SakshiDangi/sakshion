import type {
  TutorContext
} from "../context/ContextBuilder";



export function buildLessonPrompt(
  context:TutorContext
):string {


  return `

Teach the following concept:

Concept:
${context.currentConcept}


Learner mastery:
${context.mastery}%


Learner confidence:
${context.confidence}%


Previous concepts completed:
${context.completedConcepts.join(", ")}


Learning goal:
${context.learningGoal}


Create a structured lesson.

Include:

1. Title
2. Learning objective
3. Explanation
4. Examples
5. Common mistakes
6. Summary


Adapt the difficulty to the learner.

`;

}