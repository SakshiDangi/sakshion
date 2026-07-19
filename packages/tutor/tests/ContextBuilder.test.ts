import {
 describe,
 expect,
 it
} from "vitest";


import {
 ContextBuilder
} from "../src";



describe(
"ContextBuilder",
()=>{


it(
"creates personalized tutor context",
()=>{


const context =
ContextBuilder.build({

studentId:"student-1",

conceptId:"fractions",

conceptName:"Equivalent Fractions",

prerequisites:[

"Fractions"

],

mastery:42,

confidence:38,

completedConcepts:[

"Division"

],

learningGoal:
"Understand equivalent fractions",

studentQuestion:
"Why are 2/4 and 1/2 equal?"

});



expect(
context.currentConcept
)
.toBe(
"Equivalent Fractions"
);



expect(
context.mastery
)
.toBe(42);



expect(
context.studentQuestion
)
.toContain(
"equal"
);



});


});