"use client";

import { Article, useArticlesStore } from "@/helpers/stores/articles.store";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Download, Eye, Trash } from "lucide-react";
import ReactPDF from "@react-pdf/renderer";
const ArticlePDF = dynamic(() => import("./article-pdf.component"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import generatePDF, { usePDF } from "react-to-pdf";
import { useTranslation } from "react-i18next";
import {
  ButtonDialog,
  ButtonSheet,
  DeleteButtonAlertDialog,
  ShredButton,
} from "@/components/buttons-popups/buttons-popups";
import ArticleDetails from "./article-details.component";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { Button } from "@/components/ui/button";
import ArticleForm from "../forms/article.form";
import {
  TUpdateArticleSchema,
  useUpdateArticleForm,
} from "../forms/article.schema";
import dynamic from "next/dynamic";
import { tagsItems } from "./tag";
import { withAuth } from "@/helpers/security/auth.security";

interface IArticle {
  article: Article;
}

function ArticleComponent({ article }: IArticle) {
  const form = useUpdateArticleForm();
  const [tags, setTags] = useState(
    tagsItems.map((item) => ({
      ...item,
      isSelected: article.tags.some((t) => {
        if (t.id === item.id) return t.isSelected;
      }),
    }))
  );

  const { removeArticle, forceRender, updateArticle } = useArticlesStore();
  const { t } = useTranslation("article");

  const [files, setFiles] = useState();

  const onSubmit = (data: TUpdateArticleSchema) => {
    try {
      updateArticle(article.id, {
        title: data.title ?? article.title,
        content: data.content ?? article.content,
        category: data.category ? JSON.parse(data.category!) : article.category,
        publishStatus: data.isPublished ?? article.publishStatus,
        schedulePublishDate:
          data.schedulePublishedDate ?? article.schedulePublishDate,
        publishedAt: data.schedulePublishedDate ? null : new Date(),
        coverImage: article.coverImage,
        id: article.id,
        tags: tags ?? article.tags,
      });

      // form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      key={article.id}
      className="flex flex-col gap-2 border shadow-sm p-2 rounded-md"
    >
      <h3>
        <b>{article.title}</b>
      </h3>
      <p>{article?.category?.name}</p>
      <p className="text-sm">
        <span>{t("published")}</span>
        {JSON.stringify(article.publishStatus)}
      </p>
      <p className="text-sm">
        <span>{t("publish_date")}</span>{" "}
        {article?.publishedAt ? (
          dayjs(article?.publishedAt).format("YYYY-MM-DD")
        ) : (
          <b>-</b>
        )}
      </p>

      <div className="flex flex-row gap-1 mt-3">
        <ButtonDialog
          actionStatus={{ status: "Read" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          dialogProps={{
            title: "Article Info",
            content: <ArticleDetails article={article} />,
            width: 600,
          }}
        />
        <ButtonSheet
          actionStatus={{ status: "Update" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          sheetProps={{
            title: "Article Data",
            width: 500,
            content: (
              <ArticleForm
                isCreateState={false}
                states={{ setTags, tags, files, setFiles }}
                form={form}
                onSubmit={onSubmit}
                defaultValues={{
                  tags: article.tags,
                  category: article.category,
                  content: article.content,
                  isPublished: article.publishStatus,
                  schedulePublishedDate: article.schedulePublishDate,
                  title: article.title,
                }}
              />
            ),
          }}
        />
        <DeleteButtonAlertDialog
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          dialogProps={{
            title: "Delete Request",
            description: "Do you want to delete this article",
            deleteEntityAction: () => {
              removeArticle(article.id);
            },
          }}
        />

        {/* 
        <ShredButton
          actionStatus={{ status: "Other", otherIcon: <Download /> }}
          props={{ rounded: "rounded-full", width: 30 }}
          onClick={() =>
            ReactPDF.render(<ArticlePDF article={article} />, `article.pdf`)
          }
        /> */}

        <ButtonDialog
          actionStatus={{ status: "Read" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          dialogProps={{
            title: "Article PDF",
            width: 1000,
            content: <ArticlePDF article={article} />,
          }}
        />
      </div>
    </div>
  );
}

export default ArticleComponent;
