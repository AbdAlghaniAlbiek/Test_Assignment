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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, Toaster } from "sonner";

// interface IDayRangeDialog {
//   id: number;
//   default: {
//     from?: string;
//     to?: string;
//   };

//   setDateRanges: any;
// }

// function DayRangeDialog({
//   default: { from: defaultFrom, to: defaultTo },
//   setDateRanges,
//   id,
// }: IDayRangeDialog) {
//   const [from, setFrom] = useState(defaultFrom);
//   const [to, setTo] = useState(defaultTo);

//   const onSubmit = () => {
//     if (Number.parseInt(from) > 60 || Number.parseInt(to) > 60) {
//       toast.error(`From/To must be 60 minutes or less`);
//       return;
//     }

//     if (Number.parseInt(from) > Number.parseInt(to)) {
//       toast.error(`From should be less than to`);
//       return;
//     }

//     setDateRanges((old) => [
//       ...old.map((item) => (item.id === id ? { ...item, from, to } : item)),
//     ]);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit} className="flex flex-col gap-4">
//         <div>
//           <Label htmlFor="from">From (in minutes)</Label>
//           <Input
//             id="from"
//             placeholder="From"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//           />
//         </div>

//         <div>
//           <Label htmlFor="to">To (in minutes)</Label>
//           <Input
//             id="to"
//             placeholder="To"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//           />
//         </div>
//         <Button type="submit">Submit</Button>
//       </form>
//     </div>
//   );
// }

function CreateDayRangeDialog() {
  const {
    dateRanges,
    addRange: addDateRange,
    copiedDateRang,
  } = useWorkingHoursStore();

  const [from, setFrom] = useState(copiedDateRang.from ?? 0);
  const [fromMinutes, setFromMinutes] = useState(
    copiedDateRang.fromMinutes ?? 0
  );
  const [to, setTo] = useState(copiedDateRang.to ?? 0);
  const [toMinutes, setToMinutes] = useState(copiedDateRang.toMinutes ?? 0);
  const [selectedDay, setSelectedDay] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    dateRanges.forEach((dateRange) => {
      if (dateRange.day === selectedDay) {
        const overlappedTimeRange = dateRange.ranges.some(
          (range) =>
            from >= range.from &&
            to <= range.to &&
            fromMinutes >= range.fromMinutes &&
            toMinutes <= range.toMinutes
        );
        if (overlappedTimeRange) {
          setDisabledButton(true);
          toast.error(
            `There is overlapping between the date you specified with another exist one`
          );
        } else {
          setDisabledButton(false);
        }
      }
    });
  }, [from, to, fromMinutes, toMinutes, selectedDay]);

  const { t } = useTranslation("working_hours");

  const onSubmit = (e) => {
    e.preventDefault();

    if (from > 12 || to > 12 || to < 1 || from < 1) {
      toast.error(`From and To should be between 1 and 12 hours`);
      return;
    }

    if (
      fromMinutes > 60 ||
      toMinutes > 60 ||
      toMinutes < 1 ||
      fromMinutes < 1
    ) {
      toast.error(`From and To should be between 1 and 60 minutes`);
      return;
    }

    dateRanges.forEach((dateRang) => {
      if (dateRang.day === selectedDay) {
        addDateRange(dateRang.id!, { from, to, fromMinutes, toMinutes });
      }
    });
  };

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

        <div>
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
        </div>

        <Button type="submit" disabled={disabledButton}>
          {t("SUBMIT")}
        </Button>
      </form>
    </div>
  );
}

export default CreateDayRangeDialog;
