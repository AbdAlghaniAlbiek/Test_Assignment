import React from "react";
import WorkingHoursPage from "./working-hours.page";
import { AuthCheck } from "@/helpers/security/auth.security";

function page() {
  return (
    <div>
      <WorkingHoursPage />
    </div>
  );
}

export default page;
