import { cn } from "@/app/_lib/utils";
import { getFormattedToAndFromCvDate } from "@/utils/date-utils";
import { ComponentProps } from "react";

type TimeProps = ComponentProps<"time"> & {
  fromDate: string;
  toDate: string;
};

function Time({ className, fromDate, toDate, ...props }: TimeProps) {
  return (
    <time className={cn("text-sm text-zinc-400", className)} {...props}>
      {getFormattedToAndFromCvDate(new Date(fromDate), new Date(toDate))}
    </time>
  );
}

export { Time };
