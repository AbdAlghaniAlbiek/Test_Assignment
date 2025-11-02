"use client";

import AppSidebar, { IAppSidebarItemProps } from "@/components/sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import AppLogo from "../../assets/app-logo.png";
import { AppRoutes } from "@/helpers/routes/routes";
import {
  ChartNoAxesCombined,
  Hourglass,
  Newspaper,
  Settings,
} from "lucide-react";
import Header from "../layout/header";
import { useAuthStore } from "@/helpers/stores/auth.store";
import { redirect } from "next/navigation";
import { useAppSettingsStore } from "@/helpers/stores/settings.store";
import { ThemeProvider } from "next-themes";
import { useTranslation } from "react-i18next";

function layout({ children }: { children: React.ReactNode }) {
  const [hideAppName, setHideAppName] = useState<boolean>(false);
  const toggleShowingAppName = () => {
    setHideAppName(!hideAppName);
  };

  const { auth } = useAuthStore();
  if (!auth) {
    redirect(AppRoutes.Auth);
  }

  const { t } = useTranslation("sidebar");

  const { language } = useAppSettingsStore();

  return (
    <SidebarProvider>
      <AppSidebar
        side={language === "English" ? "left" : "right"}
        header={
          <div className="pt-3 flex flex-col gap-2 justify-center items-center">
            <Image src={AppLogo} alt="app_logo" width={100} height={100} />
            <p className="font-bold text-lg" hidden={hideAppName}>
              {t("APP_TITLE")}
            </p>
          </div>
        }
        content={{
          groups: [
            {
              label: t("APPLICATION"),
              items: [
                {
                  icon: <Newspaper />,
                  path: AppRoutes.Articles,
                  tag: "articles",
                  title: t("ARTICLES"),
                },

                {
                  icon: <ChartNoAxesCombined />,
                  path: AppRoutes.Stats,
                  tag: "stats",
                  title: t("STATS"),
                },
                {
                  icon: <Hourglass />,
                  path: AppRoutes.WorkingHours,
                  tag: "working_hours",
                  title: t("WORKING_HOURS"),
                },
                {
                  icon: <Settings />,
                  path: AppRoutes.Settings,
                  tag: "settings",
                  title: t("SETTINGS"),
                },
              ] as IAppSidebarItemProps[],
            },
          ],
        }}
      />

      <div className="flex flex-col w-full">
        <Header key="header" toggleShowingAppName={toggleShowingAppName} />

        <main
          className="bg-sidebar lg:px-4 lg:py-4 md:px-4 md:py-4 sm:px-2 sm:py-2 w-full"
          key="main"
        >
          <SidebarInset>{children}</SidebarInset>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default layout;
