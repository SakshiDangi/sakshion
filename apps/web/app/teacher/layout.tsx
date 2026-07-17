import { AppShell } from "@/components/common";


export default function TeacherLayout({
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