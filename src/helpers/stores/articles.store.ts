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
  tags: { id: number; label: string; isSelected: boolean }[];
  content: string;
  coverImage?: any;
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
    coverImage: "",
    category: { id: 1, name: "News" },
    publishedAt: new Date(),
    publishStatus: true,
    tags: [
      { id: 1, label: "Food", isSelected: true },
      { id: 2, label: "Fries", isSelected: true },
      { id: 3, label: "Drinks", isSelected: true },
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
    coverImage: "",
    category: { id: 1, name: "News" },
    publishedAt: new Date(),
    publishStatus: true,
    tags: [
      { id: 1, label: "Food", isSelected: true },
      { id: 2, label: "Fries", isSelected: true },
      { id: 3, label: "Drinks", isSelected: true },
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
    coverImage: "",
    category: { id: 2, name: "National Geographic" },
    publishedAt: new Date(),
    publishStatus: true,
    tags: [
      { id: 1, label: "Food", isSelected: true },
      { id: 2, label: "Fries", isSelected: true },
      { id: 3, label: "Drinks", isSelected: true },
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
    content:
      "<p>This Collection invites original research on the impact of transboundary climate risks on communities and ecosystems, as well as adaptation strategies. Modelling or Econometrics studies, supported by observational data, to predict and understand the non-market impact of such events are welcome. Climate change is a global phenomenon with consequences that go beyond natural and political borders. As a reflection of the interconnection and interdependency between ecosystems and communities, transboundary climate risks, such as food insecurity or decreasing availability of natural resources, can impact regions far from the location of the initial event. Despite their widespread nature, the extent of the risks is not equally perceived and can be exacerbated by socioeconomic disparities. Addressing such events and mitigating their impact will require global co-operation to develop robust and sustainable adaptation strategies. This Collection invites original research on the impact of transboundary climate risks on communities and ecosystems, as well as adaptation strategies. Modelling or Econometrics studies, supported by observational data, to predict and understand the non-market impact of such events are welcome. Climate change is a global phenomenon with consequences that go beyond natural and political borders. As a reflection of the interconnection and interdependency between ecosystems and communities, transboundary climate risks, such as food insecurity or decreasing availability of natural resources, can impact regions far from the location of the initial event. Despite their widespread nature, the extent of the risks is not equally perceived and can be exacerbated by socioeconomic disparities. Addressing such events and mitigating their impact will require global co-operation to develop robust and sustainable adaptation strategies. This Collection invites original research on the impact of transboundary climate risks on communities and ecosystems, as well as adaptation strategies. Modelling or Econometrics studies, supported by observational data, to predict and understand the non-market impact of such events are welcome. Climate change is a global phenomenon with consequences that go beyond natural and political borders. As a reflection of the interconnection and interdependency between ecosystems and communities, transboundary climate risks, such as food insecurity or decreasing availability of natural resources, can impact regions far from the location of the initial event. Despite their widespread nature, the extent of the risks is not equally perceived and can be exacerbated by socioeconomic disparities. Addressing such events and mitigating their impact will require global co-operation to develop robust and sustainable adaptation strategies.</p>",
    coverImage: "",
    category: { id: 2, name: "National Geographic" },
    schedulePublishDate: new Date("2025-11-30T06:28:05.241Z"),
    publishStatus: false,
    tags: [
      { id: 1, label: "Food", isSelected: true },
      { id: 2, label: "Fries", isSelected: true },
      { id: 3, label: "Drinks", isSelected: true },
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
