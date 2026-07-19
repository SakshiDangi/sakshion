export function clamp(
  value:number,
  min:number,
  max:number
):number {


  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );


}



export function average(
  values:number[]
):number {


  if(
    values.length === 0
  ){

    return 0;

  }


  const total =
    values.reduce(
      (sum,value)=>
        sum + value,
      0
    );


  return total /
    values.length;


}



export function unique<T>(
  values:T[]
):T[] {


  return [
    ...new Set(values)
  ];


}