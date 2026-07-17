import {Badge} from "@/components/ui/badge";


type MasteryStatus =
"mastered"
|"learning"
|"struggling";


const labels = {

mastered:"Mastered",

learning:"Learning",

struggling:"Needs Practice",

};


export default function MasteryBadge({
status
}:{
status:MasteryStatus;
}){


return (

<Badge>

{labels[status]}

</Badge>

);

}