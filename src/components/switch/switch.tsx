"use client";

import { Dispatch, SetStateAction, useId, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch as SwitchComp } from "@/components/ui/switch";

interface ISwitch {
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export default function Switch({ checked, onCheckChange }: ISwitch) {
  const id = useId();

  return (
    <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
      <SwitchComp
        id={id}
        checked={checked}
        onCheckedChange={onCheckChange}
        className="peer absolute inset-0 h-[inherit] w-auto data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
      />
      <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
        <MoonIcon size={16} aria-hidden="true" />
      </span>
      <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
        <SunIcon size={16} aria-hidden="true" />
      </span>
    </div>
  );
}

export function SwitchLang({ checked, onCheckChange }: ISwitch) {
  const id = useId();

  return (
    <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
      <SwitchComp
        id={id}
        checked={checked}
        onCheckedChange={onCheckChange}
        className="peer absolute inset-0 h-[inherit] w-auto data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
      />
      <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
        <p className="text-sm font-bold" aria-hidden="true">
          EN
        </p>
      </span>
      <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
        <p className="text-sm font-bold" aria-hidden="true">
          AR
        </p>
      </span>
    </div>
  );
}
