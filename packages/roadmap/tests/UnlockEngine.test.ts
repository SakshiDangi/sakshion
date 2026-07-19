import {
 describe,
 expect,
 it
} from "vitest";


import {
 UnlockEngine
} from "../src";


import {
 RoadmapNodeStatus
} from "../src";



describe(
"UnlockEngine",
()=>{


it(
"unlocks concept when prerequisites are complete",
()=>{


const unlocked =
UnlockEngine.canUnlock({

conceptId:"equivalent-fractions",

prerequisites:[

{
conceptId:"fractions",
requiredMastery:70
}

],

mastery:{

fractions:80

}

});



expect(unlocked)
.toBe(true);



});



it(
"keeps concept locked when mastery is low",
()=>{


const unlocked =
UnlockEngine.canUnlock({

conceptId:"equivalent-fractions",

prerequisites:[

{
conceptId:"fractions",
requiredMastery:70
}

],

mastery:{

fractions:50

}

});



expect(unlocked)
.toBe(false);



});



it(
"returns roadmap status",
()=>{


const status =
UnlockEngine.getStatus({

conceptId:"fractions",

prerequisites:[],

mastery:{}

});



expect(status)
.toBe(
RoadmapNodeStatus.AVAILABLE
);



});


});