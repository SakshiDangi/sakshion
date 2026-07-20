import {
 describe,
 expect,
 it
} from "vitest";


import {
 ResponseValidator
} from "../src";



describe(
"ResponseValidator",
()=>{


it(
"accepts valid tutor response",
()=>{


const result =
ResponseValidator.validate({

lesson:{

title:"Fractions",

objective:
"Understand fractions",

content:
"Fractions represent parts of a whole using numbers.",

examples:[

"1/2 represents one half"

],

commonMistakes:[],

summary:
"Fractions show equal parts."

},


examples:[

"1/2 = 2/4"

],


hint:null,


summary:
"Learned equivalent fractions",


nextAction:
"Practice"

});



expect(
result.valid
)
.toBe(true);



});





it(
"rejects empty examples",
()=>{


const result =
ResponseValidator.validate({

lesson:null,


examples:[],


hint:null,


summary:
"Test",


nextAction:
"Continue"


});



expect(
result.valid
)
.toBe(false);



expect(
result.errors.length
)
.toBeGreaterThan(0);



});


});