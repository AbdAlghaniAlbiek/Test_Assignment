import { cn } from "@/lib/utils";
import React from "react";

export const tagsItems = [
  {
    id: 1,
    label: "Food",
    isSelected: false,
  },
  {
    id: 2,
    label: "Fries",
    isSelected: false,
  },
  {
    id: 3,
    label: "Drinks",
    isSelected: false,
  },
];

interface ITag {
  id: number;
  label: string;
  isSelected: boolean;
  setTags: any;
}

function Tag({ id, label, isSelected, setTags }: ITag) {
  return (
    <div
      onClick={() =>
        setTags((old: any) => [
          ...old.map((tag: any) =>
            tag.id === id ? { ...tag, isSelected: !tag.isSelected } : tag
          ),
        ])
      }
      className={cn(
        isSelected ? "bg-primary text-white dark:text-black" : "",
        "border shadow-sm p-2 text-sm rounded-sm"
      )}
    >
      {label}
    </div>
  );
}

export default Tag;
