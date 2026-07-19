import { describe, expect, it } from "vitest";

import {
  TwinFactory
} from "../src/state/TwinFactory";


describe(
"TwinFactory",
()=>{


it(
"creates initial digital twin",
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
mastery:80
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



expect(
twin.statistics.averageMastery
)
.toBe(
65
);



});


});