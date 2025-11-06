"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  daysItems,
  useWorkingHoursStore,
} from "@/helpers/stores/working-hours.store";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, Toaster } from "sonner";
import {
  TCreateWorkingHoursSchema,
  useCreateWorkingHourForm,
} from "../forms/working-hours.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function CreateDayRangeDialog() {
  const {
    dateRanges,
    addRange: addDateRange,
    copiedDateRang,
    addRangeIds,
    rangeIds,
  } = useWorkingHoursStore();

  const { watch, ...form } = useCreateWorkingHourForm();
  const [disabledButton, setDisabledButton] = useState(false);

  const from = watch("from");
  const to = watch("to");
  const day = watch("day");

  useEffect(() => {
    dateRanges.forEach((dateRange) => {
      if (day) {
        if (dateRange.day === JSON.parse(day)) {
          const overlappedTimeRange = dateRange.ranges.some((range) => {
            if (
              Number.parseInt(from.split(":")[0]) >= range.from &&
              Number.parseInt(to.split(":")[0]) <= range.to &&
              Number.parseInt(from.split(":")[1]) >= range.fromMinutes &&
              Number.parseInt(to.split(":")[1]) <= range.toMinutes
            ) {
              return true;
            }
          });
          if (overlappedTimeRange) {
            setDisabledButton(true);
            toast.error(
              `There is overlapping between the date you specified with another exist one`
            );
          } else {
            setDisabledButton(false);
          }
        }
      }
    });
  }, [from, to, day, watch, dateRanges]);

  const { t } = useTranslation("working_hours");

  const onSubmit = (data: TCreateWorkingHoursSchema) => {
    // e.preventDefault();

    // if (from > 24 || to > 24 || to < 1 || from < 1) {
    //   toast.error(`From and To should be between 1 and 24 hours`);
    //   return;
    // }

    // if (
    //   fromMinutes > 60 ||
    //   toMinutes > 60 ||
    //   toMinutes < 1 ||
    //   fromMinutes < 1
    // ) {
    //   toast.error(`From and To should be between 1 and 60 minutes`);
    //   return;
    // }

    dateRanges.forEach((dateRang) => {
      if (dateRang.day == JSON.parse(data.day)) {
        addDateRange(dateRang.id!, {
          from: Number.parseInt(data.from.split(":")[0]),
          to: Number.parseInt(data.to.split(":")[0]),
          fromMinutes: Number.parseInt(data.from.split(":")[1]),
          toMinutes: Number.parseInt(data.to.split(":")[1]),
        });
        addRangeIds(rangeIds);
      }
    });
  };

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
                  <Input id="to" placeholder={t("TO")} type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("DAY")}</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {daysItems.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={JSON.stringify(item)}
                          >
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div>
            <Label htmlFor="category">{t("DAY")}</Label>
            <Select onValueChange={(value) => setSelectedDay(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {daysItems.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}

          <Button type="submit" disabled={disabledButton}>
            {t("SUBMIT")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateDayRangeDialog;
