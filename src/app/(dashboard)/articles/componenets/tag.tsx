import { cn } from "@/lib/utils";
import React from "react";

export const tagsItems = [
  {
    id: 1,
    label: "tag1",
    isSelected: false,
  },
  {
    id: 2,
    label: "tag2",
    isSelected: false,
  },
  {
    id: 3,
    label: "tag3",
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
