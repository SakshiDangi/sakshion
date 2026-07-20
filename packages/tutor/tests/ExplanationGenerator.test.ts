import {
 describe,
 expect,
 it
} from "vitest";


import {
 ExplanationGenerator
} from "../src";



describe(
"ExplanationGenerator",
()=>{


it(
"creates beginner explanation",
()=>{


const explanation =
ExplanationGenerator.generate({

concept:"Equivalent Fractions",

mastery:20,

confidence:30

});



expect(
explanation.level
)
.toBe(
"BEGINNER"
);



});





it(
"creates intermediate explanation",
()=>{


const explanation =
ExplanationGenerator.generate({

concept:"Fractions",

mastery:60,

confidence:50

});



expect(
explanation.level
)
.toBe(
"INTERMEDIATE"
);



});





it(
"creates advanced explanation",
()=>{


const explanation =
ExplanationGenerator.generate({

concept:"Algebra",

mastery:90,

confidence:85

});



expect(
explanation.level
)
.toBe(
"ADVANCED"
);



});


});