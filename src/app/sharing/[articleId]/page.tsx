import React from "react";
import ArticleSharing from "./article.sharing";
import { useRouter } from "next/router";

async function page({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params;

  return (
    <div>
      <ArticleSharing articleId={Number.parseInt(articleId)} />
    </div>
  );
}

export default page;
