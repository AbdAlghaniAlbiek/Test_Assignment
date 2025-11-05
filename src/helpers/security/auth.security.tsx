"use client";

import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth.store";
import { AppRoutes } from "../routes/routes";
import { useEffect } from "react";

export const AuthCheck = (props) => {
  const router = useRouter();
  const { auth } = useAuthStore();

  useEffect(() => {
    if (
      (typeof window !== "undefined" && auth === null) ||
      auth?.isLoggedIn === false
    ) {
      //   redirect("/auth");
      router.push("/auth");
    }
  }, [auth, router]);

  return props.children;
};
