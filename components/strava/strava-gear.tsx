"use client";

import useStravaStats from "@/components/strava/hooks/use-strava-stats";
import StravaHeadingAndValues from "@/components/strava/strava-heading-and-values";
import { StravaGearSimple } from "@/types";

type StravaGearProps = {
  title?: string;
  gear: StravaGearSimple[];
};

export default function StravaGear({ title, gear = [], ...other }: StravaGearProps) {
  const { stats } = useStravaStats();

  const nameAndValues = (gear.length > 0 ? gear : stats?.gear ?? []).map(gear => ({
    name: gear.name,
    value: `${gear.distance} km`
  }));

  return (
    <StravaHeadingAndValues title={title ?? "Gear"} nameAndValues={nameAndValues} {...other} />
  );
}
