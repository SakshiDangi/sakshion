import {
  DashboardService,
} from "@sakshion/application";


import {
  cache,
} from "react";


export const getStudentDashboard =
  cache(
    async (
      studentId:string,
    ) => {

      const service =
        new DashboardService();


      return service.getDashboard(
        studentId,
      );

    },
  );