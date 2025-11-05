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
  from: string;
  fromMinutes: string;
  to: string;
  toMinutes: string;
}

function UpdateDayRange({
  from: defaultFrom,
  fromMinutes: defaultFromMinutes,
  to: defaultTo,
  toMinutes: defaultToMinutes,
  rangeId,
}: IUpdateDayRange) {
  const { addToUpdatedRanges } = useWorkingHoursStore();

  const form = useUpdateWorkingHourForm();

  console.log(defaultFrom, defaultTo, defaultFromMinutes, defaultToMinutes);

  const onSubmit = (data: TUpdateWorkingHoursSchema) => {
    // if (from > to) {
    //   toast.error(`From should be less than To`);
    //   return;
    // }

    addToUpdatedRanges({
      id: rangeId,
      from: data?.from
        ? Number.parseInt(data?.from?.split(":")[0])
        : Number.parseFloat(defaultFrom),
      to: data.to
        ? Number.parseInt(data.to.split(":")[0])
        : Number.parseInt(defaultTo),
      fromMinutes: data.from
        ? Number.parseInt(data.from.split(":")[1])
        : Number.parseInt(defaultFromMinutes),
      toMinutes: data.to
        ? Number.parseInt(data.to.split(":")[1])
        : Number.parseInt(defaultToMinutes),
    });
  };

  const { t } = useTranslation("working_hours");

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
                    defaultValue={`${defaultTo.toString()}:${defaultToMinutes.toString()}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("SUBMIT")}</Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateDayRange;
