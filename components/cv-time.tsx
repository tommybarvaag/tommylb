import { HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { getFormattedToAndFromCvDate } from "@/utils/date-utils";

type CvTimeProps = HTMLAttributes<HTMLTimeElement> & {
  fromDate: string;
  toDate: string;
};

const CvTime = forwardRef<HTMLTimeElement, CvTimeProps>(
  ({ className, fromDate, toDate, ...props }, ref) => (
    <time className={cn("text-sm text-muted-foreground", className)} {...props} ref={ref}>
      {getFormattedToAndFromCvDate(new Date(fromDate), new Date(toDate))}
    </time>
  )
);

CvTime.displayName = "CvTime";

export { CvTime };
