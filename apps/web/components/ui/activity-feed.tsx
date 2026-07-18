import {
  Card,
  CardContent
} from "@/components/ui/card";


interface Activity {

title:string;

time:string;

}



export default function ActivityFeed({
items
}:{
items:Activity[];
}){


return (

<Card>

<CardContent className="p-6 space-y-4">


{
items.map((item,index)=>(

<div
key={index}
className="border-b pb-3"
>

<div className="font-medium">
{item.title}
</div>


<div className="text-sm text-muted-foreground">
{item.time}
</div>


</div>


))
}


</CardContent>


</Card>

);

}