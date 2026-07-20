export function clamp(

  value:number,

  min:number,

  max:number

):number{

  return Math.min(

    max,

    Math.max(

      min,

      value

    )

  );

}



export function isBlank(

  value:string

):boolean{

  return value.trim().length===0;

}



export function truncate(

  text:string,

  length:number

):string{

  if(text.length<=length){

    return text;

  }

  return text.slice(0,length)+"...";

}