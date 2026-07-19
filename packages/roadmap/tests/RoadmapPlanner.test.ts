import {
 describe,
 expect,
 it
} from "vitest";


import {
 RoadmapPlanner
} from "../src";



describe(
"RoadmapPlanner",
()=>{


it(
"creates initial roadmap",
()=>{


const roadmap =
RoadmapPlanner.generate(

"student-1",

[

{
conceptId:"addition",
mastery:90,
estimatedMinutes:20
},

{
conceptId:"fractions",
mastery:40,
estimatedMinutes:30
},

{
conceptId:"decimals",
mastery:70,
estimatedMinutes:25
}

]

);



expect(
roadmap.currentConcept
)
.toBe(
"fractions"
);



expect(
roadmap.upcomingConcepts.length
)
.toBe(3);



});



it(
"marks mastered concepts complete",
()=>{


const roadmap =
RoadmapPlanner.generate(

"student-1",

[

{
conceptId:"addition",
mastery:90,
estimatedMinutes:20
}

]

);



expect(
  roadmap.upcomingConcepts[0]?.status
)
.toBe(
  "COMPLETED"
);



});


});