import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { TUserSchema, useUserForm } from "./user-profile.schema";
import { Input } from "@/components/ui/input";
import { useAuthForm } from "@/app/auth/auth.schema";
import { useAuthStore } from "@/helpers/stores/auth.store";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

function UpdateUserForm() {
  const form = useUserForm();
  const { auth, updateUserAuth } = useAuthStore();

  const onSubmit = (data: TUserSchema) => {
    updateUserAuth({
      email: data.email ?? auth!.email!,
      name: data.name ?? auth!.name!,
      profileImage: auth?.profileImage,
    });
  };

  const { t } = useTranslation("settings");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("NAME")}</FormLabel>
              <FormControl>
                <Input
                  className="block"
                  id="title"
                  type="text"
                  placeholder="Great News"
                  defaultValue={auth?.name}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("EMAIL")}</FormLabel>
              <FormControl>
                <Input
                  className="block"
                  id="title"
                  type="text"
                  placeholder="Great News"
                  defaultValue={auth?.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{t("SUBMIT")}</Button>
      </form>
    </Form>
  );
}

export default UpdateUserForm;
