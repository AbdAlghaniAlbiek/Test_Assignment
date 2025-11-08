import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface IToolTip {
  children: React.ReactNode;
  content: string | React.ReactNode;
}
function ToolTip({ children, content }: IToolTip) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

export default ToolTip;
