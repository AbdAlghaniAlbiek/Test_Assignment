"use client";

import { Button } from "@/components/ui/button";
import { useWorkingHoursStore } from "@/helpers/stores/working-hours.store";
import { cn } from "@/lib/utils";
import UpdateDayRange from "../dialogs/update-day-range";

// interface IDayRange {
//   time: string;
//   from: string | null;
//   to: string | null;
//   onClick: () => void;
// }

// function DayRange({ time, onClick, from, to }: IDayRange) {
//   return (
//     <div
//       className={cn(
//         from || to ? "bg-primary text-white dark:text-black" : "",
//         "border w-[160px] h-[80px] cursor-pointer"
//       )}
//       onClick={onClick}
//     >
//       {time}
//     </div>
//   );
// }

interface IDayRange {
  id: number;
  rangeId: number;
  from: number;
  fromMinutes: number;
  to: number;
  toMinutes: number;
  onClick?: () => void;
  //   setDialogContent: any;
}

function DayRange({
  from,
  to,
  rangeId,
  id,
  onClick,
  fromMinutes,
  toMinutes,
}: //   setDialogContent,
IDayRange) {
  const { deleteDateRange } = useWorkingHoursStore();

  return (
    <div
      className={cn(
        from || to ? "bg-primary text-white dark:text-black" : "",
        "border w-[160px] h-[80px] cursor-pointer relative rounded-md"
      )}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 flex flex-col gap-1">
        <Button
          className=" w-[30px] h-[30px] bg-red-500 hover:bg-red-600 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            deleteDateRange(id, rangeId);
          }}
        >
          Del
        </Button>
        {/* <Button
          className="w-[30px] h-[30px] bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => {
            setDialogContent(
              <UpdateDayRange
                from={from}
                to={to}
                rangeId={id}
                fromMinutes={fromMinutes}
                toMinutes={toMinutes}
              />
            );
          }}
        >
          Mod
        </Button> */}
      </div>
      <p>
        {from}:{fromMinutes} - {to}:{toMinutes}
      </p>
    </div>
  );
}

export default DayRange;
