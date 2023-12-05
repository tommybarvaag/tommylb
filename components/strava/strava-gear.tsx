"use client";

import StravaHeadingAndValues from "@/components/strava/strava-heading-and-values";
import { StravaGearSimple, StravaStats } from "@/types";

type StravaGearProps = {
  stats: StravaStats;
  title?: string;
  gear: StravaGearSimple[];
};

export default function StravaGear({ stats, title, gear = [], ...other }: StravaGearProps) {
  const nameAndValues = (gear.length > 0 ? gear : stats?.gear ?? []).map(gear => ({
    name: gear.name,
    value: `${gear.distance} km`
  }));

  return (
    <StravaHeadingAndValues title={title ?? "Gear"} nameAndValues={nameAndValues} {...other} />
  );
}
