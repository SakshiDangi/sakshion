import {
 describe,
 expect,
 it
} from "vitest";


import {
 DifficultyRanker
} from "../src";



describe(
"DifficultyRanker",
()=>{


it(
"allows reasonable difficulty jump",
()=>{


const result =
DifficultyRanker.isSuitable({

currentMastery:50,

conceptDifficulty:70

});


expect(result)
.toBe(true);


});



it(
"blocks large difficulty jump",
()=>{


const result =
DifficultyRanker.isSuitable({

currentMastery:30,

conceptDifficulty:90

});


expect(result)
.toBe(false);


});


});