import {
  describe,
  expect,
  it,
} from "vitest";


import {
  TwinFactory
} from "../src/state/TwinFactory";


import {
  InsightGenerator
} from "../src/insights/InsightGenerator";



describe(
"InsightGenerator",
()=>{


it(
"finds strongest and weakest concepts",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:40
},

{
conceptId:"decimals",
mastery:90
},

{
conceptId:"geometry",
mastery:70
}

]

});



const insight =
InsightGenerator.generate(
twin
);



expect(
insight.strongestConcept
)
.toBe(
"decimals"
);



expect(
insight.weakestConcept
)
.toBe(
"fractions"
);



});



it(
"generates improvement recommendation",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:40
}

]

});



const insight =
InsightGenerator.generate(
twin
);



expect(
insight.recommendation
)
.toContain(
"fractions"
);



});


it(
"handles empty learner state",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});



const insight =
InsightGenerator.generate(
twin
);



expect(
insight.strongestConcept
)
.toBeNull();



});


});