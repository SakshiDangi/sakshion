import {
 describe,
 expect,
 it
} from "vitest";


import {
 TutorSessionManager
} from "../src";



describe(
"TutorSessionManager",
()=>{


it(
"creates tutor session",
()=>{


const manager =
new TutorSessionManager();



const session =
manager.create({

studentId:"student-1",

conceptId:"fractions"

});



expect(
session.studentId
)
.toBe(
"student-1"
);



expect(
session.messages.length
)
.toBe(0);



});





it(
"appends messages without mutation",
()=>{


const manager =
new TutorSessionManager();



const session =
manager.create({

studentId:"student-1",

conceptId:"fractions"

});



const updated =
manager.append(

session.sessionId,

{

role:"student",

content:"Why are fractions equal?",

timestamp:new Date()

}

);



expect(
session.messages.length
)
.toBe(0);



expect(
updated.messages.length
)
.toBe(1);



});





it(
"completes session",
()=>{


const manager =
new TutorSessionManager();



const session =
manager.create({

studentId:"student-1",

conceptId:"fractions"

});



const completed =
manager.complete(
session.sessionId
);



expect(
completed.completedAt
)
.not
.toBeNull();



});


});