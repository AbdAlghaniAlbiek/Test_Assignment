import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { TUserSchema, useUserForm } from "./user-profile.schema";
import { Input } from "@/components/ui/input";
import { useAuthForm } from "@/app/auth/auth.schema";
import { useAuthStore } from "@/helpers/stores/auth.store";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import FileUploader, { IFileUploaderFile } from "@craft-code/file-uploader";

function UpdateUserForm() {
  const form = useUserForm();
  const { auth, updateUserAuth } = useAuthStore();
  //   const [files, setFiles] = useState<IFileUploaderFile[] | undefined>(
  //     undefined
  //   );

  //   const [file, setFile] = useState();

  const onSubmit = (data: TUserSchema) => {
    updateUserAuth({
      email: data.email ?? auth!.email!,
      name: data.name ?? auth!.name!,
      profileImage:
        files && files.length > 0 ? files[0].url : auth?.profileImage,
    });
  };

  const { t } = useTranslation("settings");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* <FileUploader
          dark
          fileTypes={["images"]}
          files={files ?? []}
          label="Select File"
          limitFileSize={true}
          multi={false}
          required={false}
          sizeLimitInMb={20}
          onFilesChange={(files) => setFiles(files)}
        /> */}

        {/* <Input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}

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
