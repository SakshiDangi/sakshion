import {MasteryCalculator} from "./MasteryCalculator";


export class MasteryUpdater{


update(
current:number,
score:number
){

return MasteryCalculator.calculate(
current,
score
);

}


}