import { StravaActivityWithGearAndPersonalBests } from "@/lib/strava";
import { useMemo } from "react";
import useSwr, { SWRConfiguration } from "swr";
import fetcher from "../../../lib/fetcher";
import { isString } from "../../../utils/commonUtils";

export const defaultConfig: SWRConfiguration = { revalidateOnMount: true, refreshInterval: 360000 };

export default function useStravaActivities(config: SWRConfiguration = defaultConfig) {
  const { data: activities } = useSwr<StravaActivityWithGearAndPersonalBests[]>(
    "/api/strava",
    url => fetcher(url),
    {
      ...defaultConfig,
      ...config
    }
  );

  const lastActivity = useMemo(
    () => activities?.find(activity => isString(activity.type)),
    [activities]
  );

  const lastRunActivity = useMemo(
    () => activities?.find(activity => activity.type === "Run"),
    [activities]
  );

  return { activities, lastActivity, lastRunActivity };
}
