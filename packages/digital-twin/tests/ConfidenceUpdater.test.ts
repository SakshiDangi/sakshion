import {
  describe,
  expect,
  it,
} from "vitest";


import {
  TwinFactory
} from "../src/state/TwinFactory";


import {
  ConfidenceUpdater
} from "../src/confidence/ConfidenceUpdater";



describe(
"ConfidenceUpdater",
()=>{


it(
"increases confidence after success",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});



const updated =
ConfidenceUpdater.updateConcept(
twin,
"fractions",
true
);



expect(
updated.confidence.fractions.confidence
)
.toBe(5);



expect(
updated.confidence.fractions.evidenceCount
)
.toBe(1);



});



it(
"decreases confidence after failure",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});



const updated =
ConfidenceUpdater.updateConcept(
twin,
"fractions",
false
);



expect(
updated.confidence.fractions.confidence
)
.toBe(0);



});



it(
"never exceeds 100",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});



let updated=twin;


for(let i=0;i<30;i++){


updated =
ConfidenceUpdater.updateConcept(
updated,
"fractions",
true
);


}



expect(
updated.confidence.fractions.confidence
)
.toBe(100);



});



});