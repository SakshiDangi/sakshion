import {
Card,
CardContent,
CardHeader,
CardTitle
}
from "@/components/ui/card";


export default function AIInsightCard({
message
}:{
message:string;
}){


return (

<Card>


<CardHeader>

<CardTitle>
AI Insight
</CardTitle>

</CardHeader>


<CardContent>

<p>
{message}
</p>

</CardContent>


</Card>

);

}