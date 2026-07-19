import {
 describe,
 expect,
 it
} from "vitest";


import {
 SYSTEM_PROMPT,
 buildLessonPrompt,
 buildQuestionPrompt,
 buildHintPrompt
} from "../src";



const context = {


studentId:"student-1",

conceptId:"fractions",

currentConcept:"Equivalent Fractions",

prerequisites:[
"Fractions"
],

mastery:40,

confidence:35,

completedConcepts:[
"Division"
],

learningGoal:
"Understand fractions",

studentQuestion:
"Why are they equal?"


};



describe(
"Prompt System",
()=>{


it(
"creates system prompt",
()=>{


expect(
SYSTEM_PROMPT
)
.toContain(
"MentorOS Tutor"
);


});





it(
"creates lesson prompt",
()=>{


const prompt =
buildLessonPrompt(
context
);



expect(prompt)
.toContain(
"Equivalent Fractions"
);


});





it(
"creates question prompt",
()=>{


const prompt =
buildQuestionPrompt(
context
);



expect(prompt)
.toContain(
"Why are they equal?"
);



});





it(
"creates hint prompt",
()=>{


const prompt =
buildHintPrompt(
context,
1
);



expect(prompt)
.toContain(
"Hint level"
);


});


});