"use client";

import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import React, { useState } from "react";
import AppLogo from "../assets/app-logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/helpers/stores/auth.store";
import { redirect, useRouter } from "next/navigation";
import { AppRoutes } from "@/helpers/routes/routes";
import { toast } from "sonner";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { setUserAuth, auth } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonDisabled(true);

      if (!email || !password) {
        toast.error("You should fill both email and password fields");
        return;
      }

      if (email !== auth?.email || password !== auth?.password) {
        toast.error("Email or password incorrect");
        return;
      }

      await setUserAuth();
      toast.success("Ahmad you signed in successfully");

      router.push(AppRoutes.Articles);
      // redirect(AppRoutes.Articles);
      // window.history.replaceState(AppRoutes.Articles, "");

      setButtonDisabled(false);
    } catch (err) {
      setButtonDisabled(true);
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-sidebar">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="123456"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-5"
              disabled={buttonDisabled}
            >
              Login
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2">
          
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default page;
