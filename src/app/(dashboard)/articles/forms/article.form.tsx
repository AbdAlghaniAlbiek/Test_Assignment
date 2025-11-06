"use client";

import { Button } from "@/components/ui/button";
import { SchedulePublishAt } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categoriesItems,
  useArticlesStore,
} from "@/helpers/stores/articles.store";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";
import dynamic from "next/dynamic";
import Tag, { tagsItems } from "../componenets/tag";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { Switch } from "@/components/ui/switch";
import { check } from "zod";
import FileUploader, {
  FileWithInfo,
  CanvasWithInfo,
  IFileUploaderFile,
} from "@craft-code/file-uploader";

// const ClassicEditor = dynamic(
//   () => import("@ckeditor/ckeditor5-build-classic"),
//   {
//     ssr: false,
//   }
// );
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
  }
);
import { ScrollArea } from "@/components/ui/scroll-area";

interface IArticleForm<T> {
  isCreateState: boolean;
  form: any;
  onSubmit: (data: T) => void;
  isButtonDisabled: boolean;
  defaultValues?: {
    title: string;
    category: string;
    tags: { id: number; label: string; isSelected: boolean }[];
    isPublished: boolean;
    content: string;
    schedulePublishedDate?: Date | null;
  };
  states: {
    tags: any;
    setTags: any;
    files: any;
    setFiles: any;
  };
}

function CKEditorComponent({
  onChange,
  content,
}: {
  onChange: any;
  content: string;
}) {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(e, editor) => {
          const val = editor.getData();
          onChange(val);
        }}
        config={{
          licenseKey:
            "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjI5MDU1OTksImp0aSI6IjMwYTM3NDAzLTU1ZGMtNDNkZS1iYzM4LWQwM2YxY2ZkM2Q4NSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImIwMWUzZWI4In0.hTiJryB-vr--iAZdL_ffMwreUxniIOTe3UmzEY1BB7DVM3HdNeRcgDKjdQ4khFYAayyTUg5SYPEy1qrEtv3hKw",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Strikethrough,
            Subscript,
            Superscript,
            Underline,
            FormatPainter,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "|",
            "formatPainter",
          ],
        }}
      />
    </div>
  );
}

function ArticleForm<T>({
  onSubmit,
  defaultValues,
  form,
  isCreateState,
  states: { setTags, tags, files, setFiles },
  isButtonDisabled,
}: IArticleForm<T>) {
  const { t } = useTranslation("article");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-auto">
        <ScrollArea>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-8 w-[400px] columns-1 overflow-y-auto px-1">
              {/* <Label>{t("TITLE")}</Label> */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("TITLE")}</FormLabel>
                    <FormControl>
                      <Input
                        className="block"
                        id="title"
                        type="text"
                        placeholder="Great News"
                        defaultValue={defaultValues?.title}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("CATEGORY")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={JSON.stringify(defaultValues?.category)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categoriesItems.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={JSON.stringify(category)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("IS_PUBLISHED")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          disabled={
                            defaultValues?.schedulePublishedDate ? true : false
                          }
                          id="isPublished"
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                          defaultChecked={defaultValues?.isPublished}
                        />
                        <Label htmlFor="isPublished">{t("IS_PUBLISHED")}</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="schedulePublishedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SCHEDULE_PUBLISH_AT")}</FormLabel>
                    <FormControl>
                      <SchedulePublishAt
                        onSelectChange={(date: Date) => {
                          field.onChange(date);
                        }}
                        defaultValue={defaultValues?.schedulePublishedDate}
                        //   date={schedulePublishDate}
                        //   setDate={setSchedulePublishDate}
                        //   field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label htmlFor="tags">{t("TAGS")}</Label>
                <div className="flex flex-row gap-2">
                  {tags?.map((tag) => (
                    <Tag
                      id={tag.id}
                      isSelected={
                        tag.isSelected ??
                        defaultValues?.tags?.some((t) => t.id === tag.id)
                      }
                      label={tag.label}
                      setTags={setTags}
                      key={tag.id}
                    />
                  ))}
                </div>
              </div>

              {!isCreateState && (
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("CONTENT")}</FormLabel>
                      <FormControl>
                        <CKEditorComponent
                          onChange={(val) => field.onChange(val)}
                          content={defaultValues?.content}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isCreateState && (
                <FileUploader
                  dark
                  fileTypes={["images"]}
                  files={files ?? []}
                  label="Select File"
                  limitFileSize={true}
                  multi={false}
                  required={false}
                  sizeLimitInMb={20}
                  onFilesChange={(files) => setFiles(files)}
                />
              )}

              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="w-[160px]"
              >
                {t("SUBMIT")}
              </Button>
            </div>

            {isCreateState && (
              <div className="columns-2 flex flex-col gap-2 px-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("CONTENT")}</FormLabel>
                      <FormControl>
                        <CKEditorComponent
                          onChange={(val) => field.onChange(val)}
                          content={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}

export default ArticleForm;
