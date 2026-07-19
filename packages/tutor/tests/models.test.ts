import {
 describe,
 expect,
 it
} from "vitest";


import type {
 TutorSession,
 Lesson,
 Hint
} from "../src";



describe(
"Tutor Models",
()=>{


it(
"creates tutor session structure",
()=>{


const session:TutorSession = {


sessionId:"session-1",


studentId:"student-1",


conceptId:"fractions",


startedAt:new Date(),


completedAt:null,


messages:[]

};



expect(
session.studentId
)
.toBe(
"student-1"
);



});





it(
"creates lesson model",
()=>{


const lesson:Lesson = {


title:"Fractions",


objective:"Understand equivalent fractions",


content:"Explanation",


examples:["1/2 = 2/4"],


commonMistakes:[],


summary:"Fractions represent values"

};



expect(
lesson.title
)
.toBe(
"Fractions"
);



});





it(
"creates hint model",
()=>{


const hint:Hint = {


level:1,


message:"Think about equal ratios"

};



expect(
hint.level
)
.toBe(1);



});


});