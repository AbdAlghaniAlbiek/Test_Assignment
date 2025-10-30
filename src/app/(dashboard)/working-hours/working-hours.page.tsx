"use client";

import PageContent from "@/components/content/content";
import React, { useState } from "react";
import DayRange from "./components/day-range";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DayRangeDialog from "./dialogs/create-day-range";
import { useWorkingHoursStore } from "@/helpers/stores/working-hours.store";
import CreateDayRangeDialog from "./dialogs/create-day-range";
import UpdateDayRange from "./dialogs/update-day-range";
import { useTranslation } from "react-i18next";

function WorkingHoursPage() {
  const {
    addRange: addDateRange,
    copiedDateRang,
    dateRanges,
    deleteDateRange,
    updatedRanges,
    saveUpdatedRanges,
    discardChanges,
    clearUpdateRange,
  } = useWorkingHoursStore();

  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<any>();

  const { t } = useTranslation("working_hours");

  return (
    <PageContent>
      {updatedRanges?.length > 0 && (
        <div className="border rounded-md p-2 flex flow-row gap-2 mb-3 items-center">
          {t("UNSAVED_CHANGES")}
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => {
              saveUpdatedRanges();
              clearUpdateRange();
            }}
          >
            {t("SAVE")}
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => discardChanges()}
          >
            {t("DISCARD")}
          </Button>
        </div>
      )}

      {dateRanges.map((day, i) => (
        <div key={i} className="flex flex-row">
          <p className="mr-4 h-[80px]">{day.day}</p>

          {day.ranges?.map((time, j) => (
            <DayRange
              from={time.from}
              to={time.to}
              key={j}
              id={day.id}
              rangeId={time.id}
              fromMinutes={time.fromMinutes}
              toMinutes={time.toMinutes}
              // setDialogContent={setDialogContent}
              onClick={() => {
                setIsOpen(true);
                setDialogContent(
                  <UpdateDayRange
                    from={time.from}
                    to={time.to}
                    rangeId={time.id}
                    fromMinutes={time.fromMinutes}
                    toMinutes={time.toMinutes}
                  />
                );
              }}
            />
          ))}
        </div>
      ))}

      <Button
        onClick={() => {
          setIsOpen(true);
          setDialogContent(<CreateDayRangeDialog />);
        }}
      >
        {t("CERATE_TIME_RANGE")}
      </Button>

      <Dialog open={isOpen}>
        {/* <DialogTrigger asChild>
        <Button>Create Time Range</Button>
        </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("TIME_RANGE")}</DialogTitle>
            <DialogDescription>{t("DIALOG_DESC")}</DialogDescription>
          </DialogHeader>

          {dialogContent}
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setIsOpen(false)}>{t("CANCEL")}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContent>
  );
}

export default WorkingHoursPage;
