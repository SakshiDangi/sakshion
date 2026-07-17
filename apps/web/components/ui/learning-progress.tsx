import {
Progress
} from "@/components/ui/progress";


export default function LearningProgress({
title,
value,
}:{
title:string;
value:number;
}){


return (

<div className="space-y-2">


<div className="flex justify-between">

<span className="text-sm">
{title}
</span>


<span className="text-sm text-muted-foreground">
{value}%
</span>


</div>


<Progress value={value}/>


</div>

);

}