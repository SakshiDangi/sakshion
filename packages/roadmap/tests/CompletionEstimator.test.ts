import {
 describe,
 expect,
 it
} from "vitest";


import {
 CompletionEstimator
} from "../src";



describe(
"CompletionEstimator",
()=>{


it(
"calculates remaining learning time",
()=>{


const estimate =
CompletionEstimator.estimate({

concepts:[


{
conceptId:"fractions",

estimatedMinutes:30,

completed:false

},


{
conceptId:"decimals",

estimatedMinutes:20,

completed:false

},


{
conceptId:"addition",

estimatedMinutes:15,

completed:true

}


]

});



expect(
estimate.remainingConcepts
)
.toBe(2);



expect(
estimate.totalMinutes
)
.toBe(50);



expect(
estimate.sessions
)
.toBe(2);



});



it(
"supports custom session duration",
()=>{


const estimate =
CompletionEstimator.estimate({

sessionMinutes:60,

concepts:[

{
conceptId:"fractions",

estimatedMinutes:120,

completed:false

}

]

});



expect(
estimate.sessions
)
.toBe(2);



});


});