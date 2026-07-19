import {
 describe,
 expect,
 it
} from "vitest";


import {
 TwinFactory
} from "../src/state/TwinFactory";


import {
 ProgressTracker
} from "../src/progress/ProgressTracker";


import {
 HistoryTracker
} from "../src/progress/HistoryTracker";



describe(
"ProgressTracker",
()=>{


it(
"calculates average mastery",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:50
},

{
conceptId:"decimals",
mastery:90
}

]

});


const average =
ProgressTracker.calculateAverageMastery(
twin
);


expect(
average
)
.toBe(70);


});



it(
"counts completed concepts",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:80
},

{
conceptId:"geometry",
mastery:40
}

]

});


expect(
ProgressTracker.calculateCompletedConcepts(
twin
)
)
.toBe(1);


});



it(
"updates statistics",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:100
}

]

});


const updated =
ProgressTracker.updateStatistics(
twin
);


expect(
updated.statistics.averageMastery
)
.toBe(100);



});


});



describe(
"HistoryTracker",
()=>{


it(
"creates progress snapshot",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});


const updated =
HistoryTracker.record(
twin
);


expect(
updated.history.length
)
.toBe(1);



expect(
twin.history.length
)
.toBe(0);



});


});