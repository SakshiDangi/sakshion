import {
  Card,
  CardContent
} from "@/components/ui/card";

export default function SkillNode({
name,
level,
}:{
name:string;
level:string;
}){


return (

<Card
className="cursor-pointer hover:shadow-md"
>

<CardContent
className="p-4"
>

<div className="font-semibold">
{name}
</div>


<div className="text-sm text-muted-foreground mt-1">
{level}
</div>


</CardContent>

</Card>

);

}