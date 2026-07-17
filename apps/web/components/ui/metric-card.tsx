import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function MetricCard({
  title,
  value,
  description,
}: {
  title:string;
  value:string;
  description?:string;
}) {

return (

<Card>

<CardHeader>

<CardTitle className="text-sm text-muted-foreground">
{title}
</CardTitle>

</CardHeader>


<CardContent>

<div className="text-3xl font-bold">
{value}
</div>


{
description &&
<p className="mt-2 text-sm text-muted-foreground">
{description}
</p>
}


</CardContent>


</Card>

);

}