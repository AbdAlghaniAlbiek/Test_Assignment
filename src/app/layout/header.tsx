"use client";

import Switch, { SwitchLang } from "@/components/switch/switch";
// import { Select } from '@/components/select/select';
// import { Avatar } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  getShortcutNameAvatar,
  snakeToPascalCase,
} from "@/helpers/shared/stringOperations.helper";
import { useAuthStore } from "@/helpers/stores/auth.store";
import { useAppSettingsStore } from "@/helpers/stores/settings.store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import profileImage from "@/assets/profile-image.png";
import { useTheme } from "next-themes";
import i18n from "@/helpers/i18n/i18n";
import { useTranslation } from "react-i18next";

interface IHeader {
  routesToIgnore?: string[];
  toggleShowingAppName: () => void;
}

function Header({ routesToIgnore, toggleShowingAppName }: IHeader) {
  const { toggleTheme, toggleLanguage, theme, language } =
    useAppSettingsStore();

  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  useEffect(() => {
    setNextTheme(theme === "Dark" ? "dark" : "light");
  }, [theme, setNextTheme]);

  useEffect(() => {
    i18n.changeLanguage(`${language[0].toLowerCase()!}${language[1]}`);
  }, [language]);

  const { auth } = useAuthStore();

  const pathname = usePathname();
  const separatedFullPath = pathname.split("/");
  const paths: string[] = [];
  for (let i = 0; i < separatedFullPath.length; i++) {
    if (
      routesToIgnore &&
      routesToIgnore.length > 0 &&
      routesToIgnore?.includes(separatedFullPath[i])
    )
      continue;
    if (i === 0 || i === separatedFullPath.length - 1) continue;
    paths.push(separatedFullPath[i]);
  }

  const pascalCasePaths: string[] = [];
  paths.forEach(
    (path) =>
      !path.includes("id") &&
      isNaN(Number.parseInt(path)) &&
      pascalCasePaths.push(snakeToPascalCase(path))
  );

  const lastPathLink = snakeToPascalCase(
    separatedFullPath[separatedFullPath.length - 1]
  );

  const { t } = useTranslation("header");

  return (
    <header
      className={cn(
        "py-3 px-4  bg-card  flex flex-row justify-between rounded-bl-md rounded-br-md border-b-[2px] w-full"
      )}
    >
      <div
        className="flex flex-row gap-3 justify-start items-center"
        key="page_path_sidebar_trigger"
      >
        <SidebarTrigger onClick={toggleShowingAppName} key="sidebar_trigger" />

        <Breadcrumb key="breadcrumb">
          <BreadcrumbList>
            {pascalCasePaths.map(
              (path, i) =>
                path && (
                  <Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/${path.toLowerCase()}` as any}>
                          {t(`${path}`)}
                          {/* {path} */}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </Fragment>
                )
            )}

            {separatedFullPath[separatedFullPath.length - 1] && (
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {t(`${lastPathLink}`)}
                  {/* {snakeToPascalCase(
                    separatedFullPath[separatedFullPath.length - 1]
                  )} */}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div
        className="flex flex-row gap-3 items-center"
        key="lang_theme_user_info"
      >
        {/* <Select
          key="lang"
          onValueChange={(val) => setLang(val)}
          // setValue={setLang}
          value={lang}
          placeholder="Select Language"
          defaultValue={AppLangEnum.English.toString()}
          groups={[
            {
              items: Object.values(AppLangEnum).map((lang) => ({
                content: lang,
                value: lang.toString(),
              })),
            },
          ]}
        />
        <Select
          key="theme"
          // setValue={setTheme}
          onValueChange={(val) => {
            setTheme(val);
            setNextTheme(val);
          }}
          value={theme}
          placeholder="Select Theme"
          defaultValue={AppThemeEnum.Light.toString()}
          groups={[
            {
              items: Object.values(AppThemeEnum).map((theme) => ({
                content: theme,
                value: theme.toString(),
              })),
            },
          ]}
        /> */}

        {/** Theme Toggle */}
        <Switch
          checked={theme === "Light" ? false : true}
          onCheckChange={(checked) => toggleTheme()}
        />

        {/** Language Toggle */}
        <SwitchLang
          checked={language === "English" ? false : true}
          onCheckChange={(checked) => toggleLanguage()}
        />

        <div className="rounded-full bg-gray-200 w-[40px] h-[40px] flex justify-center items-center">
          {auth?.profileImage ? (
            <Image
              src={auth.profileImage ?? profileImage}
              alt="profile_image"
              width={40}
              height={40}
            />
          ) : (
            <p className="font-bold text-blue-600">
              {getShortcutNameAvatar(auth?.name!)}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
