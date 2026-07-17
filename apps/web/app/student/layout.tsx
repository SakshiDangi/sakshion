import { AppShell } from "@/components/common";


export default function StudentLayout({
children,
}:{
children:React.ReactNode;
}){

return (

<AppShell>

{children}

</AppShell>

);

}