import { create } from "zustand";

interface Range {
  id: number;
  from: number;
  fromMinutes: number;
  to: number;
  toMinutes: number;
}

interface DateRang {
  id: number;
  day: string;
  //   from?: string;
  //   to?: string;
  ranges: Range[];
}

export const daysItems = ["Sun", "Mon", "Tue", "Wed", "The", "Fri", "Sat"];

interface IWorkingHoursStore {
  dateRanges: DateRang[];
  updatedRanges: Range[];
  addToUpdatedRanges: (range: Range) => void;
  saveUpdatedRanges: () => void;
  copiedDateRang: {
    from: number;
    fromMinutes: number;
    to: number;
    toMinutes: number;
  };
  addRange: (
    id: number,
    range: { from: number; to: number; fromMinutes: number; toMinutes: number }
  ) => void;
  deleteDateRange: (id: number, rangeId: number) => void;
  discardChanges: () => void;
  clearUpdateRange: () => void;
  copyRange: (range: Range) => void;
}

function addRange(
  dateRange: DateRang,
  range: { from: number; to: number; fromMinutes: number; toMinutes: number }
) {
  const id = dateRange.ranges[dateRange?.ranges?.length - 1]?.id
    ? dateRange.ranges[dateRange?.ranges?.length - 1]?.id + 1
    : 1;

  dateRange.ranges?.push({
    from: range.from,
    to: range.to,
    id,
    fromMinutes: range.fromMinutes,
    toMinutes: range.toMinutes,
  });
  return dateRange;
}

function removeRange(dateRange: DateRang, rangeId: number) {
  dateRange.ranges = dateRange.ranges.filter((range) => range.id !== rangeId);
  return dateRange;
}

function saveUpdateRangesOperation(
  updatedRanges: Range[],
  dateRanges: DateRang[]
) {
  dateRanges.forEach((dateRange) => {
    dateRange.ranges = dateRange.ranges.map((range) => {
      const isRangeFound = updatedRanges.find(
        (updaterRange) => updaterRange.id === range.id
      );

      if (isRangeFound) {
        return isRangeFound;
      } else {
        return range;
      }
    });
  });
  updatedRanges = [];

  return dateRanges;
}

export const useWorkingHoursStore = create<IWorkingHoursStore>((set) => ({
  dateRanges: [
    {
      id: 1,
      day: "Sun",
      ranges: [],
    },
    {
      id: 2,
      day: "Mon",
      ranges: [],
    },
    {
      id: 3,
      day: "Tue",
      ranges: [],
    },
    {
      id: 4,
      day: "Wed",
      ranges: [],
    },
    {
      id: 5,
      day: "The",
      ranges: [],
    },
    {
      id: 6,
      day: "Fri",
      ranges: [],
    },
    {
      id: 7,
      day: "Sat",
      ranges: [],
    },
  ],
  copiedDateRang: {},
  updatedRanges: [],
  addRange: (id, range) =>
    set((state) => ({
      ...state,
      dateRanges: [
        ...state.dateRanges.map((dateRange) =>
          dateRange.id === id ? addRange(dateRange, range) : dateRange
        ),
      ],
    })),
  deleteDateRange: (id: number, rangeId: number) =>
    set((state) => ({
      ...state,
      dateRanges: [
        ...state.dateRanges.map((dateRange) =>
          dateRange.id === id ? removeRange(dateRange, rangeId) : dateRange
        ),
      ],
    })),
  addToUpdatedRanges: (range: Range) =>
    set((state) => ({
      ...state,
      updatedRanges: [...state.updatedRanges, range],
    })),
  saveUpdatedRanges: () =>
    set((state) => ({
      ...state,
      dateRanges: [
        ...saveUpdateRangesOperation(state.updatedRanges, state.dateRanges),
      ],
    })),
  discardChanges: () => set((state) => ({ ...state, updatedRanges: [] })),
  clearUpdateRange: () => set((state) => ({ ...state, updatedRanges: [] })),
  copyRange: (range) => set((state) => ({ ...state, copiedDateRang: range })),
}));
