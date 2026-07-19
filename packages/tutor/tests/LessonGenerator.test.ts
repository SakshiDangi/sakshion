import {
 describe,
 expect,
 it
} from "vitest";


import {
 LessonGenerator,
 LessonFormatter
} from "../src";



describe(
"Lesson Generator",
()=>{


it(
"creates structured lesson",
()=>{


const lesson =
LessonGenerator.generate({

title:
"Equivalent Fractions",


objective:
"Understand equal fractions",


content:
"Fractions can represent the same value",


examples:[

"1/2 = 2/4"

],


commonMistakes:[

"Comparing only numerators"

],


summary:
"Equivalent fractions have equal value"


});



expect(
lesson.title
)
.toBe(
"Equivalent Fractions"
);



expect(
lesson.examples.length
)
.toBe(1);



});





it(
"adds defaults for missing fields",
()=>{


const lesson =
LessonFormatter.format({

title:
"Fractions"


});



expect(
lesson.examples
)
.toEqual([]);



expect(
lesson.summary
)
.toBe("");



});


});