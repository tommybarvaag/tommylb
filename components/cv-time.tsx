import { HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

import {
  getDurationAsYearsAndMonths,
  getFormattedShortMonthAndYearDate,
  getFormattedToAndFromCvDate,
  isToday,
  parseCvDate
} from "@/utils/date-utils";

type CvTimeProps = HTMLAttributes<HTMLTimeElement> & {
  fromDate: string;
  toDate: string;
};

function getCvTimeParts(fromDate: string, toDate: string) {
  const from = parseCvDate(fromDate);
  const to = parseCvDate(toDate);
  const end = isToday(to) ? "now" : getFormattedShortMonthAndYearDate(to);

  return { end, from, to };
}

const CvTime = forwardRef<HTMLTimeElement, CvTimeProps>(
  ({ className, fromDate, toDate, ...props }, ref) => {
    const { from, to } = getCvTimeParts(fromDate, toDate);

    return (
      <time className={cn("text-sm text-muted-foreground", className)} {...props} ref={ref}>
        {getFormattedToAndFromCvDate(from, to)}
      </time>
    );
  }
);

const CvDateRangeTime = forwardRef<HTMLTimeElement, CvTimeProps>(
  ({ className, fromDate, toDate, ...props }, ref) => {
    const { end, from } = getCvTimeParts(fromDate, toDate);

    return (
      <time
        className={cn("block text-sm text-muted-foreground tabular-nums", className)}
        {...props}
        ref={ref}
      >
        <span className="block">{`${getFormattedShortMonthAndYearDate(from)} – ${end}`}</span>
      </time>
    );
  }
);

const StackedCvTime = forwardRef<HTMLTimeElement, CvTimeProps>(
  ({ className, fromDate, toDate, ...props }, ref) => {
    const { end, from, to } = getCvTimeParts(fromDate, toDate);

    return (
      <time
        className={cn("block text-sm text-muted-foreground tabular-nums", className)}
        {...props}
        ref={ref}
      >
        <span className="block">{`${getFormattedShortMonthAndYearDate(from)} – ${end}`}</span>
        <span className="mt-0.5 block text-xs text-olive-500 dark:text-olive-300">
          {getDurationAsYearsAndMonths(from, to)}
        </span>
      </time>
    );
  }
);

CvTime.displayName = "CvTime";
CvDateRangeTime.displayName = "CvDateRangeTime";
StackedCvTime.displayName = "StackedCvTime";

export { CvDateRangeTime, CvTime, StackedCvTime };
