import {
  AppLayout,
} from "@/components/design-system";

export default function TeacherLayout({
children,
}:{
children:React.ReactNode;
}){

return (
<AppLayout userRole="instructor">
  {children}
</AppLayout>

);
}