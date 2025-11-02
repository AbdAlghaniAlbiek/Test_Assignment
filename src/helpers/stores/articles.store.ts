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
  coverImage?: string;
  publishStatus: boolean;
  schedulePublishDate?: Date | null;
  publishedAt?: Date | null;
  viewedAt?: string[];
}

interface IArticleStore {
  articles?: Article[];
  article: Article;
  addArticle: (article: Article) => void;
  removeArticle: (id: number) => void;
  updateArticle: (id: number, article: Article) => void;
  findArticle: (id: number) => void;
  forceRender: () => void;
}

export const articlesItems = [
  {
    id: 1,
    title: "Title1",
    content: "<p>lorem ipsum lorem ipsum lorem ipsum</p>",
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
    content: "<p>lorem ipsum lorem ipsum lorem ipsum</p>",
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
    content: "<p>lorem ipsum lorem ipsum lorem ipsum</p>",
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
    content: "<p>lorem ipsum lorem ipsum lorem ipsum</p>",
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
  article: {},
  findArticle: (id: number) =>
    set((state) => ({
      ...state,
      article: state.articles?.find((art) => art.id === id),
    })),
  addArticle: (article: Article) =>
    set((state: any) => ({
      ...state,
      articles: [...state.articles, article],
    })),
  removeArticle: (id: number) =>
    set((state: any) => ({
      ...state,
      articles: [...state.articles.filter((article) => article.id !== id)],
    })),
  updateArticle: (id: number, article: Partial<Article>) =>
    set((state: any) => ({
      ...state,
      articles: [
        ...state.articles.map((art) => (art.id === id ? article : art)),
      ],
    })),
  forceRender: () => set((state) => ({ ...state })),
}));
