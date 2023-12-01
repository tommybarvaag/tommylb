import fetcher from "@/lib/fetcher";
import { StravaStats } from "@/types";
import useSwr, { SWRConfiguration } from "swr";

export const defaultConfig: SWRConfiguration = {
  revalidateOnMount: true,
  refreshInterval: 3600000
};

export default function useStravaStats(config: SWRConfiguration = defaultConfig) {
  const { data: stats } = useSwr<StravaStats>("/api/strava/stats", url => fetcher(url), {
    ...defaultConfig,
    ...config
  });

  return { stats };
}
