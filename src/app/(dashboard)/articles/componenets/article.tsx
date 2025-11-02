"use client";

import { Article, useArticlesStore } from "@/helpers/stores/articles.store";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Download, Eye, Trash } from "lucide-react";
import ReactPDF from "@react-pdf/renderer";
import ArticlePDF from "./article-details.component";
import generatePDF, { usePDF } from "react-to-pdf";
import { useTranslation } from "react-i18next";
import {
  ButtonDialog,
  ButtonSheet,
  DeleteButtonAlertDialog,
} from "@/components/buttons-popups/buttons-popups";
import ArticleDetails from "./article-details.component";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { Button } from "@/components/ui/button";
import ArticleForm from "../forms/article.form";
import {
  TUpdateArticleSchema,
  useUpdateArticleForm,
} from "../forms/article.schema";

interface IArticle {
  article: Article;
}

function ArticleComponent({ article }: IArticle) {
  const form = useUpdateArticleForm();
  const [setTags, tags] = useState<{ id: number; label: string }[]>(
    article.tags
  );

  const { removeArticle, forceRender, updateArticle } = useArticlesStore();
  const { t } = useTranslation("article");

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
        coverImage: "",
        id: article.id,
        tags: article.tags,
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
          }}
        />
        <ButtonSheet
          actionStatus={{ status: "Update" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          sheetProps={{
            title: "Article Data",
            content: (
              <ArticleForm
                isCreateState={false}
                states={{ setTags, tags }}
                form={form}
                onSubmit={onSubmit}
                defaultValues={{
                  tag: article.tags,
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
      </div>
    </div>
  );
}

export default ArticleComponent;
