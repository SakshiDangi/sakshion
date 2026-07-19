import {
  describe,
  expect,
  it,
} from "vitest";


import {
  StreakManager
} from "../src/streak/StreakManager";



describe(
"StreakManager",
()=>{


it(
"creates first streak",
()=>{


const result =
StreakManager.update(
{

current:0,

longest:0,

lastActiveDate:""

},
"2026-07-20"
);



expect(
result.current
)
.toBe(1);



expect(
result.longest
)
.toBe(1);



});



it(
"increases streak on next day",
()=>{


const result =
StreakManager.update(
{

current:1,

longest:1,

lastActiveDate:"2026-07-20"

},
"2026-07-21"
);



expect(
result.current
)
.toBe(2);



expect(
result.longest
)
.toBe(2);



});



it(
"does not increase twice same day",
()=>{


const result =
StreakManager.update(
{

current:3,

longest:3,

lastActiveDate:"2026-07-20"

},
"2026-07-20"
);



expect(
result.current
)
.toBe(3);



});



it(
"resets streak after missed days",
()=>{


const result =
StreakManager.update(
{

current:5,

longest:5,

lastActiveDate:"2026-07-20"

},
"2026-07-23"
);



expect(
result.current
)
.toBe(1);



expect(
result.longest
)
.toBe(5);



});


});