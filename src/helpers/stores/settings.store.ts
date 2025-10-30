import { create } from "zustand";

type TLanguage = "English" | "Arabic";
type TTheme = "Light" | "Dark";

interface IAppSettings {
  theme?: TTheme;
  language?: TLanguage;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

export const useAppSettingsStore = create<IAppSettings>((set) => ({
  theme: "Light",
  language: "English",
  toggleTheme: () =>
    set((state: any) => ({
      ...state,
      theme: state.theme === "Light" ? "Dark" : "Light",
    })),
  toggleLanguage: () =>
    set((state: any) => ({
      ...state,
      language: state.language === "English" ? "Arabic" : "English",
    })),
}));
