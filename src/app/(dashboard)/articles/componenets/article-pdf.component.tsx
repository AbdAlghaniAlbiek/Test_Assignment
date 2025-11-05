"use client";

import { Article } from "@/helpers/stores/articles.store";
import React from "react";
import Tag from "./tag";
import { ta } from "zod/v4/locales";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import generatePDF, { usePDF } from "react-to-pdf";
import Image from "next/image";

interface IArticlePDF {
  article: Article;
}

function ArticlePDF({ article }: IArticlePDF) {
  const { toPDF, targetRef } = usePDF({ filename: "article-details.pdf" });

  return (
    <ScrollArea>
      <div className="flex flex-col gap-2 relative p-2" ref={targetRef}>
        <Download
          width={20}
          height={20}
          className="cursor-pointer absolute top-0 right-0"
          onClick={() =>
            //   ReactPDF.render(
            //     <ArticlePDF article={article} />,
            //     `${__dirname}/article.pdf`
            //   )
            generatePDF(targetRef, { filename: "article.pdf" })
          }
        />

        {/** Image */}
        {article?.coverImage && (
          <Image
            className="m-auto"
            src={article?.coverImage?.url ?? ""}
            width={100}
            height={100}
            alt="article_image"
          />
        )}

        {/** Title */}
        <h1 className="text-center text-5xl">{article.title}</h1>

        {/** Category && Tags */}
        <div className="flex flex-col gap-2 mt-4 pl-4">
          <div className="text-sm">
            <b>Category: </b>
            {article.category.name}
          </div>

          <div className="text-sm flex gap-2">
            <b>Tags: </b>
            <div className="flex flex-row gap-1">
              {article.tags.map((tag) =>
                tag.isSelected ? (
                  <p
                    // className="bg-primary px-2 rounded-full text-white dark:text-black"
                    key={tag.id}
                  >
                    #{tag.label},
                  </p>
                ) : (
                  <div key={tag.id}></div>
                )
              )}
            </div>
          </div>
        </div>

        {/** Content  */}
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="mt-5 px-4"
        />

        <b className="text-center mt-5 text-sm ">
          All Rights Are Reserved - 2025
        </b>
      </div>
    </ScrollArea>
  );
}

export default ArticlePDF;
