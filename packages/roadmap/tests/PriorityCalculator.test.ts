import {
 describe,
 expect,
 it
} from "vitest";


import {
 PriorityCalculator
} from "../src";



describe(
"PriorityCalculator",
()=>{


it(
"gives higher priority to weak concepts",
()=>{


const score =
PriorityCalculator.calculate({

mastery:30,

confidence:40,

difficulty:60

});


expect(score)
.toBeGreaterThan(40);



});



});