import { getFormattedToAndFromCvDate } from "@/utils/date-utils";

type CvTimeProps = {
  fromDate: string;
  toDate: string;
};

function CvTime({ fromDate, toDate }: CvTimeProps) {
  return (
    <time className="text-sm text-zinc-400">
      {getFormattedToAndFromCvDate(new Date(fromDate), new Date(toDate))}
    </time>
  );
}

export { CvTime };
