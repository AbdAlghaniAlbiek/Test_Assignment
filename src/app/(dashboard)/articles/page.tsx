import React from "react";
import ArticlesPage from "./articles.page";
import { AuthCheck } from "@/helpers/security/auth.security";

function page() {
  return (
    <div>
      <ArticlesPage />
    </div>
  );
}

export default page;
