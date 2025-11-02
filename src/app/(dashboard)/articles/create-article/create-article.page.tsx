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

// import "ckeditor5/ckeditor5.css";
// import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { useTranslation } from "react-i18next";
import ArticleForm from "../forms/article.form";
import {
  TCreateArticleSchema,
  useCreateArticleForm,
} from "../forms/article.schema";

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
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [coverImage, setCoverImage] = useState();
  // const [content, setContent] = useState("");
  // const [isPublished, setIsPublished] = useState(false);
  // const [schedulePublishDate, setSchedulePublishDate] = useState();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [tags, setTags] = useState(tagsItems);
  const { addArticle, articles } = useArticlesStore();
  const router = useRouter();

  // const cloud = useCKEditorCloud({
  //   version: "47.1.0",
  //   premium: true,
  // });

  const form = useCreateArticleForm();

  const onSubmit = (data: TCreateArticleSchema) => {
    addArticle({
      title: data.title,
      content: data.content,
      category: JSON.parse(data.category),
      publishStatus: data.isPublished,
      tags: tags.filter((tag) => {
        if (tag.isSelected) return { id: tag.id, label: tag.label };
      }),
      schedulePublishDate: data.schedulePublishedDate,
      publishedAt: data.schedulePublishedDate ? null : new Date(),
      id: articles[articles?.length - 1]?.id
        ? articles[articles?.length - 1]?.id + 1
        : 1,
      coverImage: "",
    });

    router.back();
  };

  return (
    <PageContent>
      <ArticleForm
        onSubmit={onSubmit}
        form={form}
        isCreateState={true}
        states={{ tags, setTags }}
        isButtonDisabled={isButtonDisabled}
      />
    </PageContent>
  );
}

export default CreateArticlePage;
