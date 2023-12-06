import { getHumanizedDateFromNow } from "@/utils/date-utils";

function TimeAgo() {
  return <span>{getHumanizedDateFromNow(new Date(2023, 11, 2))} ago</span>;
}

export { TimeAgo };
