import React from "react";
import StatsPage from "./stats.page";
import { AuthCheck } from "../../../helpers/security/auth.security";

function page() {
  return (
    <div>
      <StatsPage />
    </div>
  );
}

export default page;
