"use client";

import { Article, useArticlesStore } from "@/helpers/stores/articles.store";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Download, Eye, Share, SquaresExcludeIcon, Trash } from "lucide-react";
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
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
// import ToolTip from "@/components/tooltip/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const exportToExcel = async (
    data: any,
    fileName = "excel-file.xlsx",
    sheetName = "Sheet1"
  ) => {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Extract columns from the first row of data
    if (data) {
      // Dynamically define columns based on the keys in the first data object
      const columns = Object.keys(data).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header
        key: key,
        width: 20, // Adjust width as needed
      }));
      worksheet.columns = columns;

      // Add data rows
      worksheet.addRow(data);
      // data.forEach((row) => worksheet.addRow(row));
    }

    // Generate Excel file as a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer and save the file
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  };

  const onDownloadExcelFile = () => {
    const { coverImage, id, viewedAt, ...restData } = article;
    const toExportFile = {
      categoryName: restData.category.name,
      content: restData.content,
      publishStatus: JSON.stringify(restData.publishStatus),
      publishedAt: restData.publishedAt
        ? restData.publishedAt?.toLocaleDateString()
        : "---",
      schedulePublishDate: restData.schedulePublishDate
        ? restData.schedulePublishDate.toLocaleDateString()
        : "---",
      title: restData.title,
      tags: restData.tags.map((tag) => tag.label).join(", "),
    };

    // exportToExcel(new Array(1).map((_, i) => ({ ...toExportFile })));
    exportToExcel(toExportFile);
  };

  const handleShare = async (link: string) => {
    const shareData = {
      title: "Check this out!",
      text: "Here's something interesting:",
      url: `http://localhost:3000/sharing/${link}`, // current page URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } else {
        alert("Sharing not supported on this browser.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
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

      <div className="flex flex-row gap-1 mt-3 flex-wrap">
        <ButtonDialog
          actionStatus={{ status: "Read" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          dialogProps={{
            title: t("ARTICLE_INFO"),
            content: <ArticleDetails article={article} />,
            width: 600,
          }}
          tooltip={{ content: "Show Info" }}
        />
        <ButtonSheet
          tooltip={{ content: "Modify Data" }}
          actionStatus={{ status: "Update" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          sheetProps={{
            title: t("ARTICLE_DATA"),
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
          tooltip={{ content: "Delete Article" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          dialogProps={{
            title: t("DELETE_REQUEST"),
            description: t("DELETE_REQUEST_DESC"),
            deleteEntityAction: () => {
              removeArticle(article.id);
            },
          }}
        />

        <ShredButton
          tooltipProps={{ content: "Download Excel" }}
          actionStatus={{ status: "Other", otherIcon: <Download /> }}
          props={{ rounded: "rounded-full", width: 30, size: "sm" }}
          onClick={() => onDownloadExcelFile()}
        />

        <ShredButton
          tooltipProps={{ content: "Share Article" }}
          actionStatus={{ status: "Other", otherIcon: <Share /> }}
          props={{ rounded: "rounded-full", width: 30, size: "sm" }}
          onClick={() => handleShare(article.id.toString())}
        />

        <ButtonDialog
          tooltip={{ content: "Share Article" }}
          actionStatus={{ status: "Read" }}
          buttonProps={{ rounded: "rounded-full", width: 30 }}
          dialogProps={{
            title: t("ARTICLE_PDF"),
            width: 1000,
            content: <ArticlePDF article={article} />,
          }}
        />
      </div>
    </div>
  );
}

export default ArticleComponent;
