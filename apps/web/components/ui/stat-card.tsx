import {
  Card,
  CardContent
} from "@/components/ui/card";


export default function StatCard({
title,
value,
}:{
title:string;
value:string;
}){


return (

<Card>

<CardContent
className="p-6"
>

<p
className="text-sm text-muted-foreground"
>
{title}
</p>


<h2
className="text-3xl font-bold mt-2"
>
{value}
</h2>


</CardContent>

</Card>

);

}