"use client";

import PageContent from "@/components/content/content";
import { useArticlesStore } from "@/helpers/stores/articles.store";
import React, { useState, useTransition } from "react";
import ArticleComponent from "./componenets/article";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/helpers/routes/routes";
import { useTranslation } from "react-i18next";

function ArticlesPage() {
  const { articles } = useArticlesStore();

  const [art, setArt] = useState(articles!);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setArt((array) => arrayMoveImmutable(array!, oldIndex, newIndex));
  };
  const router = useRouter();

  const { t } = useTranslation("article");

  return (
    <PageContent>
      <Button
        onClick={() => router.push(AppRoutes.ArticlesCreate)}
        className="mb-5"
      >
        {t("create_article")}
      </Button>

      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        <div className="grid grid-cols-5 gap-2">
          {art.map((item) => (
            <SortableItem key={item.id}>
              <div className="item">
                <SortableKnob>
                  <ArticleComponent article={item} key={item.id} />
                </SortableKnob>
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableList>
    </PageContent>
  );
}

export default ArticlesPage;
