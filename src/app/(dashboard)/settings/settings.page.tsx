"use client";

import PageContent from "@/components/content/content";
import Switch, { SwitchLang } from "@/components/switch/switch";
import { useAuthStore } from "@/helpers/stores/auth.store";
import { useAppSettingsStore } from "@/helpers/stores/settings.store";
import Image from "next/image";
import React, { useEffect } from "react";
import profileImage from "@/assets/profile-image.png";
import { useTheme } from "next-themes";
import i18n from "@/helpers/i18n/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ButtonDialog } from "@/components/buttons-popups/buttons-popups";
import { Pencil } from "lucide-react";
import UpdateUserForm from "./forms/update-user-profile";

function SettingsPage() {
  const { auth } = useAuthStore();
  const { theme, language, toggleLanguage, toggleTheme } =
    useAppSettingsStore();

  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  useEffect(() => {
    setNextTheme(theme === "Dark" ? "dark" : "light");
  }, [theme, setNextTheme]);

  useEffect(() => {
    i18n.changeLanguage(`${language[0].toLowerCase()!}${language[1]}`);
  }, [language]);

  const { t } = useTranslation("settings");

  return (
    <PageContent>
      <div className="flex flex-col gap-10 items-center justify-center">
        <div>
          <p className="text-lg">{t("PROFILE")}</p>
          <Image
            src={auth?.profileImage ?? profileImage}
            width={200}
            height={200}
            alt="profile_image"
          />
          <div className="flex flex-col gap-3">
            <p>
              <b>{t("NAME")}</b>
              {auth?.name}
            </p>
            <p>
              <b>{t("EMAIL")}</b> {auth?.email}
            </p>
          </div>

          <div className="mt-5">
            <ButtonDialog
              actionStatus={{ status: "Other", otherIcon: <Pencil /> }}
              dialogProps={{
                title: t("USER_INFO"),
                content: <UpdateUserForm />,
              }}
              buttonProps={{ content: t("CHANGE_PROFILE") }}
            />
          </div>
        </div>

        <div>
          <p className="text-lg">{t("THEME")}</p>
          {/** Theme Toggle */}
          <Switch
            checked={theme === "Light" ? false : true}
            onCheckChange={(checked) => toggleTheme()}
          />
        </div>

        <div>
          <p className="text-lg">{t("LANGUAGE")}</p>
          {/** Language Toggle */}
          <SwitchLang
            checked={language === "English" ? false : true}
            onCheckChange={(checked) => toggleLanguage()}
          />
        </div>
      </div>
    </PageContent>
  );
}

export default SettingsPage;
