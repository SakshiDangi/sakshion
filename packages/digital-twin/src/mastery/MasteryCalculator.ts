export class MasteryCalculator {


 static calculate(
 current:number,
 score:number
 ){

 let increase=0;


 if(score>=0.9)
 increase=10;

 else if(score>=0.7)
 increase=6;

 else if(score>=0.5)
 increase=3;


 return Math.min(
 100,
 current+increase
 );


 }


}