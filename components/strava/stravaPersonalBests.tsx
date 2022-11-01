"use client";

import { useMemo } from "react";
import { StravaPersonalBestSimple } from "types";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

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
