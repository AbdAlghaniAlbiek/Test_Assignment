// import { Resource, createInstance, i18n } from "i18next";
// import resourcesToBackend from "i18next-resources-to-backend";

// import { initReactI18next } from "react-i18next/initReactI18next";
// import { i18nConfig } from "./i18n.config";

// export type i18nKeys = "common";
// export const i18nNamespaces: i18nKeys[] = ["common"];

// export default async function initTranslations(
//   locale: string,
//   namespaces: i18nKeys[],
//   i18nInstance?: i18n,
//   resources?: Resource
// ) {
//   const ns = namespaces.length > 0 ? namespaces : i18nNamespaces;
//   const defaultNS = ns[0] ?? "common";

//   i18nInstance = i18nInstance || createInstance();
//   i18nInstance.use(initReactI18next);
//   i18nInstance.setDefaultNamespace(defaultNS);

//   if (!resources) {
//     i18nInstance.use(
//       resourcesToBackend(
//         (language: string, namespace: string) =>
//           import(`@/locales/${language}/${namespace}.json`)
//       )
//     );
//   }

//   await i18nInstance.init({
//     ns,
//     lng: locale,
//     resources,
//     fallbackLng: i18nConfig.defaultLocale,
//     supportedLngs: i18nConfig.locales,
//     defaultNS,
//     fallbackNS: defaultNS,
//     preload: resources ? [] : i18nConfig.locales,
//     interpolation: {
//       escapeValue: false,
//     },
//   });

//   return {
//     t: i18nInstance.t,
//     i18n: i18nInstance,
//     resources: i18nInstance.services.resourceStore.data,
//   };
// }

// src/i18n/config.ts

// Core i18next library.
import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

import articlesEn from "@/locales/en/articles.json";
import settingsEn from "@/locales/en/settings.json";
import statsEn from "@/locales/en/stats.json";
import workingHoursEn from "@/locales/en/working_hours.json";
import sidebarEn from "@/locales/en/sidebar.json";
import headerEn from "@/locales/en/header.json";

import articlesAr from "@/locales/ar/articles.json";
import settingsAr from "@/locales/ar/settings.json";
import statsAr from "@/locales/ar/stats.json";
import workingHoursAr from "@/locales/ar/working_hours.json";
import sidebarAr from "@/locales/ar/sidebar.json";
import headerAr from "@/locales/ar/header.json";

const resources = {
  en: {
    article: articlesEn,
    settings: settingsEn,
    stats: statsEn,
    working_hours: workingHoursEn,
    sidebar: sidebarEn,
    header: headerEn,
  },
  ar: {
    article: articlesAr,
    settings: settingsAr,
    stats: statsAr,
    working_hours: workingHoursAr,
    sidebar: sidebarAr,
    header: headerAr,
  },
};

i18n
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options

    // Specifies the default language (locale) used
    // when a user visits our site for the first time.
    // We use English here, but feel free to use
    // whichever locale you want.
    lng: "en",

    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here.
    fallbackLng: "en",

    // Enables useful output in the browser’s
    // dev console.
    debug: true,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn
    // it off in i18next.
    interpolation: {
      escapeValue: false,
    },

    // Translation messages. Add any languages
    // you want here.
    resources: resources,
  });

export default i18n;
