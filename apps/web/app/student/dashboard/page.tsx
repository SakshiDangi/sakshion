export const revalidate = 0;
import StudentDashboard from "@/components/feature/dashboard/student/StudentDashboard";

import {
  DashboardService,
} from "@sakshion/application";


export const dynamic = "force-dynamic";


const dashboardService =
new DashboardService();



export default async function DashboardPage(){


const studentId =
"513037c3-ddbe-4516-8db7-b502d12de13f";


const data =
await dashboardService.getDashboard(
 studentId,
);



return (

<StudentDashboard
 data={data}
/>

);


}