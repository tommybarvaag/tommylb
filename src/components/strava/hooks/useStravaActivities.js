import * as React from "react";
import useSwr from "swr";
import fetcher from "../../../lib/fetcher";
import { isString } from "../../../utils/commonUtils";

export const defaultConfig = { initialData: [], revalidateOnMount: true, refreshInterval: 3600000 };

export default function useStravaActivities(config = defaultConfig) {
  const { data: activities } = useSwr("/api/strava/activities", url => fetcher(url), {
    ...defaultConfig,
    ...config
  });

  const lastActivity = React.useMemo(() => activities.find(activity => isString(activity.type)), [
    activities
  ]);

  const lastRunActivity = React.useMemo(
    () => activities.find(activity => activity.type === "Run"),
    [activities]
  );

  return { activities, lastActivity, lastRunActivity };
}
