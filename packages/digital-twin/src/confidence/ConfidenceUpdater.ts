export class ConfidenceUpdater{


update(
confidence:number,
success:boolean
){

const change =
success ? 4 : -2;


return Math.min(
100,
Math.max(
0,
confidence+change
)
);


}


}