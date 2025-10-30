"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkingHoursStore } from "@/helpers/stores/working-hours.store";
import React, { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface IUpdateDayRange {
  rangeId: number;
  from: number;
  fromMinutes: number;
  to: number;
  toMinutes: number;
}

function UpdateDayRange({
  from: defaultFrom,
  fromMinutes: defaultFromMinutes,
  to: defaultTo,
  toMinutes: defaultToMinutes,
  rangeId,
}: IUpdateDayRange) {
  const [from, setFrom] = useState(defaultFrom);
  const [fromMinutes, setFromMinutes] = useState(defaultFromMinutes);
  const [to, setTo] = useState(defaultTo);
  const [toMinutes, setToMinutes] = useState(defaultToMinutes);

  const { addToUpdatedRanges, updatedRanges } = useWorkingHoursStore();

  console.log(updatedRanges);

  const onSubmit = (e) => {
    e.preventDefault();
    if (from > to) {
      toast.error(`From should be less than To`);
      return;
    }

    addToUpdatedRanges({ id: rangeId, from, to, fromMinutes, toMinutes });
  };

  const { t } = useTranslation("working_hours");

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div>
            <Label htmlFor="from">{t("FROM")}</Label>
            <Input
              id="from"
              placeholder={t("FROM")}
              value={from}
              onChange={(e) => setFrom(Number.parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="from">{t("FROM_IN_MINUTES")}</Label>
            <Input
              id="from"
              placeholder={t("FROM_IN_MINUTES")}
              value={fromMinutes}
              onChange={(e) => setFromMinutes(Number.parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div>
            <Label htmlFor="to">{t("TO")}</Label>
            <Input
              id="to"
              placeholder={t("TO")}
              value={to}
              onChange={(e) => setTo(Number.parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="to">{t("TO_IN_MINUTES")}</Label>
            <Input
              id="to"
              placeholder={t("TO_IN_MINUTES")}
              value={toMinutes}
              onChange={(e) => setToMinutes(Number.parseInt(e.target.value))}
            />
          </div>
        </div>
        <Button type="submit">{t("SUBMIT")}</Button>
      </form>
    </div>
  );
}

export default UpdateDayRange;
