import { create } from "zustand";

export const categoriesItems = [
  {
    id: 1,
    name: "News",
  },
  {
    id: 2,
    name: "National Geographic",
  },
];

export interface Article {
  id: number;
  title: string;
  category: { id: number; name: string };
  tags: { id: number; label: string }[];
  content: string;
  coverImage: string;
  publishStatus: boolean;
  schedulePublishDate?: Date;
  publishedAt?: Date | null;
  viewedAt?: string[];
}

interface IArticleStore {
  articles?: Article[];
  addArticle: (article: Article) => void;
  removeArticle: (id: number) => void;
  updateArticleArticle: (id: number, article: Article) => void;
}

export const articlesItems = [
  {
    id: 1,
    title: "Title1",
    content: "lorem ipsum lorem ipsum lorem ipsum",
    coverImage: "/cover-image",
    category: { id: 1, name: "News" },
    publishedAt: new Date(),
    publishStatus: true,
    tags: [
      { id: 1, label: "tag1" },
      { id: 2, label: "tag2" },
      { id: 3, label: "tag3" },
    ],
    viewedAt: [
      "2025-10-28T06:28:05.241Z",
      "2025-10-27T06:28:05.241Z",
      "2025-10-26T06:28:05.241Z",
      "2025-10-25T06:28:05.241Z",
    ],
  },
  {
    id: 2,
    title: "Title2",
    content: "lorem ipsum lorem ipsum lorem ipsum",
    coverImage: "/cover-image",
    category: { id: 1, name: "News" },
    publishedAt: new Date(),
    publishStatus: true,
    tags: [
      { id: 1, label: "tag1" },
      { id: 2, label: "tag2" },
      { id: 3, label: "tag3" },
    ],
    viewedAt: [
      "2025-10-28T06:28:05.241Z",
      "2025-10-27T06:28:05.241Z",
      "2025-10-26T06:28:05.241Z",
      "2025-10-25T06:28:05.241Z",
    ],
  },
  {
    id: 3,
    title: "Title3",
    content: "lorem ipsum lorem ipsum lorem ipsum",
    coverImage: "/cover-image",
    category: { id: 2, name: "National Geographic" },
    publishedAt: new Date(),
    publishStatus: true,
    tags: [
      { id: 1, label: "tag1" },
      { id: 2, label: "tag2" },
      { id: 3, label: "tag3" },
    ],
    viewedAt: [
      "2025-10-28T06:28:05.241Z",
      "2025-10-27T06:28:05.241Z",
      "2025-10-26T06:28:05.241Z",
      "2025-10-25T06:28:05.241Z",
    ],
  },
  {
    id: 4,
    title: "Title4",
    content: "lorem ipsum lorem ipsum lorem ipsum",
    coverImage: "/cover-image",
    category: { id: 2, name: "National Geographic" },
    schedulePublishDate: new Date("2025-11-30T06:28:05.241Z"),
    publishStatus: false,
    tags: [
      { id: 1, label: "tag1" },
      { id: 2, label: "tag2" },
      { id: 3, label: "tag3" },
    ],
    viewedAt: [
      "2025-10-28T06:28:05.241Z",
      "2025-10-27T06:28:05.241Z",
      "2025-10-26T06:28:05.241Z",
      "2025-10-25T06:28:05.241Z",
    ],
  },
];

export const useArticlesStore = create<IArticleStore>((set) => ({
  articles: articlesItems,
  addArticle: (article: Article) =>
    set((state: any) => ({
      ...state,
      articles: [...state.articles, article],
    })),
  removeArticle: (id: number) =>
    set((state: any) => ({
      ...state,
      articles: state.article.filter((article) => article.id !== id),
    })),
  updateArticleArticle: (id: number, article: Article) =>
    set((state: any) => ({
      ...state,
      articles: state.article.map((art) => (art.id === id ? article : art)),
    })),
}));
