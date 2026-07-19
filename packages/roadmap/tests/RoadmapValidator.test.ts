import {
 describe,
 expect,
 it
} from "vitest";


import {
 RoadmapValidator
} from "../src";


import {
 RoadmapNodeStatus
} from "../src/models/RoadmapNode";



describe(
"RoadmapValidator",
()=>{


it(
"accepts valid roadmap",
()=>{


const result =
RoadmapValidator.validate({

studentId:"student-1",

currentConcept:"fractions",

completedConcepts:[],

upcomingConcepts:[

{

conceptId:"fractions",

status:
RoadmapNodeStatus.CURRENT,

priority:90,

estimatedMinutes:30

}

],

currentLesson:null,

estimatedCompletion:null,

updatedAt:new Date()

});



expect(
result.valid
)
.toBe(true);



});





it(
"rejects duplicate concepts",
()=>{


const result =
RoadmapValidator.validate({

studentId:"student-1",

currentConcept:null,

completedConcepts:[],

upcomingConcepts:[

{

conceptId:"fractions",

status:
RoadmapNodeStatus.AVAILABLE,

priority:80,

estimatedMinutes:30

},

{

conceptId:"fractions",

status:
RoadmapNodeStatus.AVAILABLE,

priority:70,

estimatedMinutes:20

}

],

currentLesson:null,

estimatedCompletion:null,

updatedAt:new Date()

});



expect(
result.valid
)
.toBe(false);



expect(
result.errors[0]
)
.toContain(
"duplicate"
);



});


});