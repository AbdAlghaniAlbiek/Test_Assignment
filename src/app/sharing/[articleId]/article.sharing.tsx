"use client";

import PageContent from "@/components/content/content";
import React from "react";

import { useArticlesStore } from "@/helpers/stores/articles.store";
import ArticlePDF from "@/app/(dashboard)/articles/componenets/article-pdf.component";

interface IArticleSharing {
  articleId: number;
}

export default function ArticleSharing({ articleId }: IArticleSharing) {
  const { articles } = useArticlesStore();

  const article = articles?.find((art) => art.id == articleId);

  return (
    <div className="px-24">
      <PageContent>
        {article ? (
          <ArticlePDF article={article} />
        ) : (
          <p>Not Found Any thing</p>
        )}
      </PageContent>
    </div>
  );
}
