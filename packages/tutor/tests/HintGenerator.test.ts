import {
 describe,
 expect,
 it
} from "vitest";


import {
 HintGenerator
} from "../src";



describe(
"HintGenerator",
()=>{


it(
"creates level 1 hint",
()=>{


const hint =
HintGenerator.generate({

concept:"Equivalent Fractions",

question:
"Why are 2/4 and 1/2 equal?",

level:1

});



expect(
hint.level
)
.toBe(1);



expect(
hint.message
)
.toContain(
"Equivalent Fractions"
);



});





it(
"creates stronger hint at level 3",
()=>{


const hint =
HintGenerator.generate({

concept:"Fractions",

question:
"How do I simplify?",

level:3

});



expect(
hint.level
)
.toBe(3);



});


});