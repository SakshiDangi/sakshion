import {
 describe,
 expect,
 it
} from "vitest";


import {
 LearningSequence
} from "../src";



describe(
"LearningSequence",
()=>{


it(
"creates prerequisite order",
()=>{


const sequence =
LearningSequence.generate([


{

conceptId:"fractions",

prerequisites:[
"division"
]

},


{

conceptId:"division",

prerequisites:[
"multiplication"
]

},


{

conceptId:"multiplication",

prerequisites:[
"addition"
]

},


{

conceptId:"addition",

prerequisites:[]

}


]);



expect(sequence)
.toEqual([

"addition",

"multiplication",

"division",

"fractions"

]);


});



it(
"handles independent concepts",
()=>{


const sequence =
LearningSequence.generate([


{

conceptId:"addition",

prerequisites:[]

},


{

conceptId:"geometry",

prerequisites:[]

}


]);



expect(sequence.length)
.toBe(2);



});


});