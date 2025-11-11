"use client";

import { Article } from "@/helpers/stores/articles.store";
import React, { useEffect, useState } from "react";
import Tag from "./tag";
import { ta } from "zod/v4/locales";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import generatePDF, { usePDF } from "react-to-pdf";
import Image from "next/image";
import { useAppSettingsStore } from "@/helpers/stores/settings.store";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface IArticlePDF {
  article: Article;
  targetRef?: any;
}

function ArticlePDF2({ article, targetRef }: IArticlePDF) {
  const { theme } = useAppSettingsStore();
  // useEffect(() => {
  //   if (theme === "Dark") {
  //     setNextTheme("light");
  //   }
  // }, [theme, setNextTheme]);

  return (
    <ScrollArea>
      <div className={cn("flex-col gap-2 relative p-2 flex")} ref={targetRef}>
        <div className="flex flex-row gap-2 justify-start items-center">
          {/** Image */}
          {article?.coverImage && article?.coverImage && (
            <Image
              src={article?.coverImage?.url ?? ""}
              width={100}
              height={100}
              alt="article_image"
            />
          )}

          {/** Title */}
          <h1 className="text-5xl text-start">{article.title}</h1>
        </div>

        {/** Category && Tags */}
        <div className="flex flex-col gap-2 mt-4 pl-4 self-end">
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

        <p className="text-end mt-10 text-xs ">
          <b>All Rights Are Reserved - 2025</b>
        </p>
        {/* <p className="text-end">hello</p> */}
      </div>
    </ScrollArea>
  );
}

export default ArticlePDF2;
