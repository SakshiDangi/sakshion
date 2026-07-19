import {
  describe,
  expect,
  it,
} from "vitest";


import {
  XPManager
} from "../src/xp/XPManager";



describe(
"XPManager",
()=>{


it(
"awards diagnostic XP",
()=>{


const xp =
XPManager.diagnosticCompleted(
0
);


expect(
xp
)
.toBe(100);


});



it(
"awards lesson XP",
()=>{


const xp =
XPManager.lessonCompleted(
100
);


expect(
xp
)
.toBe(125);


});



it(
"awards practice XP",
()=>{


const xp =
XPManager.practiceCompleted(
150
);


expect(
xp
)
.toBe(200);


});



it(
"awards daily login XP",
()=>{


const xp =
XPManager.dailyLogin(
200
);


expect(
xp
)
.toBe(210);


});



it(
"prevents negative XP",
()=>{


const xp =
XPManager.update(
10,
-50
);


expect(
xp
)
.toBe(0);


});


});