import { Article } from "@/helpers/stores/articles.store";
import React from "react";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import ReactPDF from "@react-pdf/renderer";
import ArticlePDF from "../components/article.component";
import generatePDF, { usePDF } from "react-to-pdf";
import { useTranslation } from "react-i18next";

interface IArticle {
  article: Article;
}

function ArticleComponent({ article }: IArticle) {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const { t } = useTranslation("article");

  return (
    <div
      ref={targetRef}
      key={article.id}
      className="flex flex-col gap-2 border shadow-sm p-2 rounded-md"
    >
      <h3>
        <b>{article.title}</b>
      </h3>
      <p>{article.category.name}</p>
      <p className="text-sm">
        <span>{t("published")}</span>
        {JSON.stringify(article.publishStatus)}
      </p>
      <p className="text-sm">
        <span>{t("publish_date")}</span>{" "}
        {dayjs(article?.publishedAt).format("YYYY-MM-DD") ?? <b>-</b>}
      </p>
      <Download
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() =>
          //   ReactPDF.render(
          //     <ArticlePDF article={article} />,
          //     `${__dirname}/article.pdf`
          //   )
          generatePDF(targetRef, { filename: "article.pdf" })
        }
      />

      {/* <div ref={targetRef}>
        <ArticlePDF article={article} />
      </div> */}
    </div>
  );
}

export default ArticleComponent;
