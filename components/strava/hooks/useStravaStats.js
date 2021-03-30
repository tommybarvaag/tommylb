import useSwr from "swr";
import fetcher from "../../../lib/fetcher";

export const defaultConfig = { revalidateOnMount: true, refreshInterval: 3600000 };

export default function useStravaStats(config = defaultConfig) {
  const { data: stats } = useSwr("/api/strava/stats", url => fetcher(url), {
    ...defaultConfig,
    ...config
  });

  return { stats };
}
