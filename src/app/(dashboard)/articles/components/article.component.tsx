import { Article } from "@/helpers/stores/articles.store";
import React from "react";
import Tag from "../componenets/tag";

interface IArticlePDF {
  article: Article;
}

function ArticlePDF({ article }: IArticlePDF) {
  return (
    <div>
      <p>{article.title}</p>
      <p>{article.category.name}</p>
      <p>{JSON.stringify(article.publishStatus)}</p>
      <p>{article.publishedAt?.toString()}</p>
      <p>{article.schedulePublishDate?.toString()}</p>
      <div className="flex flex-row gap-2">
        {article.tags.map((tag) => (
          <Tag label={tag.label} />
        ))}
      </div>
    </div>
  );
}

export default ArticlePDF;
