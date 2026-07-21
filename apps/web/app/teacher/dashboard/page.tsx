import React from "react";

import AppLayout from "@/components/design-system/AppLayout";
import InstructorDashboardContent from "@/components/feature/dashboard/teacher/InstructorDashboardContent";
import ToastProvider from "@/components/design-system/ui/ToastProvider";


export default function InstructorDashboardPage(){

return (
<>
<ToastProvider />

<AppLayout userRole="instructor">

<InstructorDashboardContent />

</AppLayout>

</>

);

}