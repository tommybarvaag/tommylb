import { cn } from "@/lib/utils";
import { getFormattedToAndFromCvDate } from "@/utils/date-utils";
import { HTMLAttributes, forwardRef } from "react";

type CvTimeProps = HTMLAttributes<HTMLTimeElement> & {
  fromDate: string;
  toDate: string;
};

const CvTime = forwardRef<HTMLTimeElement, CvTimeProps>(
  ({ className, fromDate, toDate, ...props }, ref) => (
    <time className={cn("text-sm text-zinc-400", className)} {...props} ref={ref}>
      {getFormattedToAndFromCvDate(new Date(fromDate), new Date(toDate))}
    </time>
  )
);

CvTime.displayName = "CvTime";

export { CvTime };
