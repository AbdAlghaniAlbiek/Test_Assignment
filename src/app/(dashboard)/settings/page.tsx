import React from "react";
import SettingsPage from "./settings.page";
import { AuthCheck } from "@/helpers/security/auth.security";

function page() {
  return (
    <div>
      <SettingsPage />
    </div>
  );
}

export default page;
