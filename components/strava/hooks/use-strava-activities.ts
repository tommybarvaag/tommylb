import fetcher from "@/lib/fetcher";
import { StravaActivityWithGearAndPersonalBests } from "@/lib/strava";
import { isString } from "@/utils/common-utils";
import { useMemo } from "react";
import useSwr, { SWRConfiguration } from "swr";

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
