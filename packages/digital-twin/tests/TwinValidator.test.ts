import {
  describe,
  expect,
  it,
} from "vitest";


import {
  TwinFactory
} from "../src/state/TwinFactory";


import {
  TwinValidator
} from "../src/validation/TwinValidator";



describe(
"TwinValidator",
()=>{


it(
"accepts valid digital twin",
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



const result =
TwinValidator.validate(
twin
);



expect(
result.valid
)
.toBe(true);



expect(
result.errors.length
)
.toBe(0);



});



it(
"rejects mastery above 100",
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



twin.mastery.fractions.mastery = 120;



const result =
TwinValidator.validate(
twin
);



expect(
result.valid
)
.toBe(false);



});



it(
"rejects negative XP",
()=>{


const twin =
TwinFactory.create({

studentId:"student-1",

assessments:[]

});


twin.xp=-10;



const result =
TwinValidator.validate(
twin
);



expect(
result.errors
)
.toContain(
"XP cannot be negative"
);



});



});