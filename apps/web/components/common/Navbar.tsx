"use client";

import {
  BrainCircuit,
} from "lucide-react";


export default function Navbar(){

return (

<header
className="
h-16
border-b
flex
items-center
justify-between
px-6
bg-background
"
>


<div className="flex items-center gap-3">

<BrainCircuit size={28}/>

<div>

<h1 className="font-bold text-xl">
MentorOS
</h1>

<p className="text-xs text-muted-foreground">
Adaptive AI Learning
</p>

</div>


</div>



<div
className="
text-sm
text-muted-foreground
"
>
Student
</div>


</header>

);

}