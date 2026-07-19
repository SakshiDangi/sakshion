import {
 describe,
 expect,
 it
} from "vitest";


import {
 RoadmapNodeStatus
} from "../src";



describe(
"Roadmap Models",
()=>{


it(
"supports roadmap node status",
()=>{


expect(
RoadmapNodeStatus.AVAILABLE
)
.toBe(
"AVAILABLE"
);


});


});