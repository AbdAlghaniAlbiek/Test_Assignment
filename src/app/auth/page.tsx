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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TAuthSchema, useAuthForm } from "./auth.schema";
import { Spinner } from "@/components/ui/spinner";

function page() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { setUserAuth, auth } = useAuthStore();
  const router = useRouter();

  const form = useAuthForm();

  const onSubmit = async (data: TAuthSchema) => {
    try {
      setButtonDisabled(true);

      if (data.email !== auth?.email || data.password !== auth?.password) {
        toast.error("Email or password incorrect");
        setButtonDisabled(false);
        return;
      }

      await setUserAuth();
      toast.success("Ahmad you signed in successfully");

      router.push(AppRoutes.Articles);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="123456"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-5 flex flex-row gap-2"
                disabled={buttonDisabled}
              >
                {form.formState.isLoading && <Spinner />}
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
