import { Article } from "@/helpers/stores/articles.store";
import React from "react";
import Tag from "./tag";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import generatePDF, { usePDF } from "react-to-pdf";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IArticlePDF {
  article: Article;
}

function ArticleDetails({ article }: IArticlePDF) {
  const { toPDF, targetRef } = usePDF({ filename: "article-details.pdf" });

  return (
    <ScrollArea>
      <div className="flex flex-col gap-5" ref={targetRef}>
        <p>
          <b>Title: </b>
          {article.title}
        </p>

        <p>
          <b>Category: </b>
          {article.category.name}
        </p>

        <p>
          <b>Is Published: </b> {JSON.stringify(article.publishStatus)}
        </p>

        <p>
          <b>Published At: </b>
          {dayjs(article.publishedAt).format("YYYY-MM-DD")}
        </p>

        <div>
          <p>
            <b>Schedule Publish At: </b>
            {article.schedulePublishDate ? (
              dayjs(article.schedulePublishDate).format("YYYY-MM-DD")
            ) : (
              <b>-</b>
            )}
          </p>
        </div>

        <div>
          <b>Tags</b>
          <div className="flex flex-row gap-2">
            {article?.tags?.map((tag, i) => (
              <Tag key={i} label={tag.label} />
            ))}
          </div>
        </div>

        <div>
          <b>Content</b>
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>

        <div className="flex flex-row gap-3">
          <b>Download: </b>
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
        </div>
      </div>
    </ScrollArea>
  );
}

export default ArticleDetails;
