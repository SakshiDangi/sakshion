import {
 describe,
 expect,
 it
} from "vitest";


import {
 RecommendationEngine
} from "../src";



describe(
"RecommendationEngine",
()=>{


it(
"selects highest priority concept",
()=>{


const recommendation =
RecommendationEngine.recommend([

{

conceptId:"fractions",

mastery:40,

confidence:50,

difficulty:60

},


{

conceptId:"decimals",

mastery:80,

confidence:90,

difficulty:40

}

]);



expect(
recommendation?.conceptId
)
.toBe(
"fractions"
);



});



it(
"returns null for empty candidates",
()=>{


const recommendation =
RecommendationEngine.recommend([]);



expect(
recommendation
)
.toBeNull();



});



it(
"generates explanation",
()=>{


const recommendation =
RecommendationEngine.recommend([

{

conceptId:"fractions",

mastery:30,

confidence:40,

difficulty:50

}

]);



expect(
recommendation?.reason
)
.toContain(
"fractions"
);



});


});