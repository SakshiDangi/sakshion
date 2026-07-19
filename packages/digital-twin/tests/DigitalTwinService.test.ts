import {
 describe,
 expect,
 it,
} from "vitest";


import {
 DigitalTwinService
} from "../src/services/DigitalTwinService";



describe(
"DigitalTwinService",
()=>{


it(
"creates learner digital twin",
()=>{


const twin =
DigitalTwinService.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:50
}

]

});


expect(
twin.studentId
)
.toBe(
"student-1"
);



expect(
twin.mastery.fractions.mastery
)
.toBe(
50
);



});



it(
"updates mastery through service",
()=>{


const twin =
DigitalTwinService.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:50
}

]

});



const updated =
DigitalTwinService.updateMastery(
twin,
"fractions",
1
);



expect(
updated.mastery.fractions.mastery
)
.toBe(
60
);



});



it(
"awards XP through service",
()=>{


const twin =
DigitalTwinService.create({

studentId:"student-1",

assessments:[]

});



const updated =
DigitalTwinService.awardXP(
twin,
100
);



expect(
updated.xp
)
.toBe(
100
);



});



it(
"generates insights",
()=>{


const twin =
DigitalTwinService.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:40
}

]

});


const insight =
DigitalTwinService.generateInsights(
twin
);



expect(
insight.weakestConcept
)
.toBe(
"fractions"
);



});


});