"use client";

// import {  } from '@craft-code/file-uploader'
import PageContent from "@/components/content/content";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button } from "@/components/ui/button";
import { SchedulePublishAt } from "@/components/ui/date-picker";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import dynamic from "next/dynamic";
import Tag, { tagsItems } from "../componenets/tag";
import {
  categoriesItems,
  useArticlesStore,
} from "@/helpers/stores/articles.store";
import "ckeditor5/ckeditor5.css";
import { useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { useRouter } from "next/navigation";
import { Essentials, Paragraph, Bold, Italic } from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { useTranslation } from "react-i18next";

// const articleSchema = z.object({
//   title: z.string(),
//   content: z.string(),
//   tags: z.string(),
// });

// const editorConfiguration = {
//   toolbar: [
//     "heading",
//     "|",
//     "bold",
//     "italic",
//     "link",
//     "bulletedList",
//     "numberedList",
//     "|",
//     "outdent",
//     "indent",
//     "|",
//     "imageUpload",
//     "blockQuote",
//     "insertTable",
//     "mediaEmbed",
//     "undo",
//     "redo",
//   ],
// };

function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState(tagsItems);
  const [coverImage, setCoverImage] = useState();
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [schedulePublishDate, setSchedulePublishDate] = useState();
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const { addArticle, articles } = useArticlesStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== "undefined")
  //     ClassicEditor.create(document.getElementById("#content")!, {
  //       licenseKey:
  //         "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjI5MDU1OTksImp0aSI6IjMwYTM3NDAzLTU1ZGMtNDNkZS1iYzM4LWQwM2YxY2ZkM2Q4NSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImIwMWUzZWI4In0.hTiJryB-vr--iAZdL_ffMwreUxniIOTe3UmzEY1BB7DVM3HdNeRcgDKjdQ4khFYAayyTUg5SYPEy1qrEtv3hKw",
  //     });
  // }, []);

  const cloud = useCKEditorCloud({
    version: "47.1.0",
    premium: true,
  });

  // const { ClassicEditor, Essentials, Paragraph, Bold, Italic } = cloud.CKEditor;

  // const { FormatPainter } = cloud.CKEditorPremiumFeatures;

  const onSubmit = (e: any) => {
    e.preventDefault();

    addArticle({
      title,
      content,
      category: {
        id: JSON.parse(category).id,
        name: JSON.parse(category).name,
      },
      publishStatus: isPublished,
      tags: tags.map((tag) => ({ id: tag.id, label: tag.label })),
      schedulePublishDate,
      publishedAt: schedulePublishDate ? null : new Date(),
      id: articles[articles?.length - 1]?.id
        ? articles[articles?.length - 1]?.id + 1
        : 1,
      coverImage: "",
    });

    router.back();
  };

  const { t } = useTranslation("article");

  return (
    <PageContent>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-8 w-[400px] columns-1">
            <div>
              <Label htmlFor="title">{t("TITLE")}</Label>
              <Input
                id="title"
                placeholder="Great News"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="category">{t("CATEGORY")}</Label>
              <Select onValueChange={(value) => setCategory(value)}>
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
            </div>

            <div className="flex items-center space-x-2" id="publishedAt">
              <Switch id="publishedAt" />
              <Label
                htmlFor="publishedAt"
                onClick={() => setIsPublished(!isPublished)}
              >
                {t("IS_PUBLISHED")}
              </Label>
            </div>

            <SchedulePublishAt date={date} setDate={setDate} />

            <div>
              <Label htmlFor="tags">{t("TAGS")}</Label>
              <div className="flex flex-row gap-2">
                {tags.map((tag) => (
                  <Tag
                    id={tag.id}
                    isSelected={tag.isSelected}
                    label={tag.label}
                    setTags={setTags}
                    key={tag.id}
                  />
                ))}
              </div>
            </div>

            <Button type="submit">{t("SUBMIT")}</Button>
          </div>

          <div className="columns-2 flex flex-col gap-2">
            <Label htmlFor="content">{t("CONTENT")}</Label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(e, editor) => {
                const val = editor.getData();
                setContent(val);
              }}
              config={{
                licenseKey:
                  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjI5MDU1OTksImp0aSI6IjMwYTM3NDAzLTU1ZGMtNDNkZS1iYzM4LWQwM2YxY2ZkM2Q4NSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImIwMWUzZWI4In0.hTiJryB-vr--iAZdL_ffMwreUxniIOTe3UmzEY1BB7DVM3HdNeRcgDKjdQ4khFYAayyTUg5SYPEy1qrEtv3hKw",
                // plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
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
        </div>
      </form>
    </PageContent>
  );
}

export default CreateArticlePage;
