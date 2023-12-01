"use client";

import useStravaStats from "@/components/strava/hooks/use-strava-stats";
import StravaHeadingAndValues from "@/components/strava/strava-heading-and-values";
import { StravaPersonalBestSimple } from "@/types";
import { useMemo } from "react";

type StravaPersonalBestsProps = {
  title?: string;
  personalBests?: StravaPersonalBestSimple[];
};

export default function StravaPersonalBests({
  title,
  personalBests = [],
  ...other
}: StravaPersonalBestsProps) {
  const { stats } = useStravaStats();

  const nameAndValues = useMemo(
    () =>
      (personalBests.length > 0 ? personalBests : stats?.personalBests).map<{
        name: string;
        value: string | number;
      }>(personalBest => ({
        name: personalBest.name,
        value: personalBest.value
      })),
    [personalBests, stats]
  );

  return (
    <StravaHeadingAndValues
      title={title ?? "Personal bests"}
      nameAndValues={nameAndValues}
      {...other}
    />
  );
}
