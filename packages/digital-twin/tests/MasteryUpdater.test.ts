import {
  describe,
  expect,
  it,
} from "vitest";


import {
  TwinFactory,
} from "../src/state/TwinFactory";


import {
  MasteryUpdater,
} from "../src/mastery/MasteryUpdater";



describe(
"MasteryUpdater",
()=>{


it(
"improves mastery after excellent practice",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:50
}

]

});



const updated =
MasteryUpdater.updateConcept(
twin,
"fractions",
1
);



expect(
updated.mastery.fractions.mastery
)
.toBe(60);



expect(
twin.mastery.fractions.mastery
)
.toBe(50);



});



it(
"adds smaller improvement for average performance",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:50
}

]

});



const updated =
MasteryUpdater.updateConcept(
twin,
"fractions",
0.5
);



expect(
updated.mastery.fractions.mastery
)
.toBe(53);


});



it(
"never exceeds 100 mastery",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[

{
conceptId:"fractions",
mastery:98
}

]

});



const updated =
MasteryUpdater.updateConcept(
twin,
"fractions",
1
);



expect(
updated.mastery.fractions.mastery
)
.toBe(100);


});



it(
"throws error for unknown concept",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});



expect(
()=>MasteryUpdater.updateConcept(
twin,
"fractions",
1
)
)
.toThrow();


});


});