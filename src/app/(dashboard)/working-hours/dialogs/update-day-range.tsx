"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkingHoursStore } from "@/helpers/stores/working-hours.store";
import React, { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  TUpdateWorkingHoursSchema,
  useUpdateWorkingHourForm,
} from "../forms/working-hours.schema";

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
  // const [from, setFrom] = useState(defaultFrom);
  // const [fromMinutes, setFromMinutes] = useState(defaultFromMinutes);
  // const [to, setTo] = useState(defaultTo);
  // const [toMinutes, setToMinutes] = useState(defaultToMinutes);

  const { addToUpdatedRanges } = useWorkingHoursStore();

  const form = useUpdateWorkingHourForm();

  const onSubmit = (data: TUpdateWorkingHoursSchema) => {
    // if (from > to) {
    //   toast.error(`From should be less than To`);
    //   return;
    // }

    addToUpdatedRanges({
      id: rangeId,
      from: data?.from
        ? Number.parseInt(data?.from?.split(":")[0])
        : defaultFrom,
      to: data.to ? Number.parseInt(data.to.split(":")[0]) : defaultTo,
      fromMinutes: data.from
        ? Number.parseInt(data.from.split(":")[1])
        : defaultFromMinutes,
      toMinutes: data.to
        ? Number.parseInt(data.to.split(":")[1])
        : defaultToMinutes,
    });
  };

  const { t } = useTranslation("working_hours");

  console.log(defaultTo, defaultToMinutes);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("FROM")}</FormLabel>
                <FormControl>
                  <Input
                    id="from"
                    type="time"
                    placeholder={t("FROM")}
                    defaultValue={`${defaultFrom}:${defaultFromMinutes}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("TO")}</FormLabel>
                <FormControl>
                  <Input
                    id="to"
                    placeholder={t("TO")}
                    type="time"
                    defaultValue={`${defaultTo}:${defaultToMinutes}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-2">
            {/* <div>
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
            </div> */}
          </div>

          {/* <div className="flex flex-row gap-2">
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
          </div> */}
          <Button type="submit">{t("SUBMIT")}</Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateDayRange;
