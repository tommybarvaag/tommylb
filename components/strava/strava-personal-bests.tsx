"use client";

import StravaHeadingAndValues from "@/components/strava/strava-heading-and-values";
import { StravaPersonalBestSimple, StravaStats } from "@/types";
import { useMemo } from "react";

type StravaPersonalBestsProps = {
  stats: StravaStats;
  title?: string;
  personalBests?: StravaPersonalBestSimple[];
};

export default function StravaPersonalBests({
  stats,
  title,
  personalBests = [],
  ...other
}: StravaPersonalBestsProps) {
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
