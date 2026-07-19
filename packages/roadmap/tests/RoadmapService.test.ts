import {
 describe,
 expect,
 it
} from "vitest";


import {
 RoadmapService
} from "../src";



describe(
"RoadmapService",
()=>{


it(
"creates and retrieves roadmap",
()=>{


const service =
new RoadmapService();



const roadmap =
service.generate(

"student-1",

[

{
conceptId:"fractions",

mastery:40,

estimatedMinutes:30

}

]

);



expect(
roadmap.studentId
)
.toBe(
"student-1"
);



const stored =
service.get(
"student-1"
);



expect(
stored?.studentId
)
.toBe(
"student-1"
);



});





it(
"returns recommendation",
()=>{


const service =
new RoadmapService();



const result =
service.recommendNext([

{

conceptId:"fractions",

mastery:30,

confidence:40,

difficulty:60

}

]);



expect(
result?.conceptId
)
.toBe(
"fractions"
);



});



});