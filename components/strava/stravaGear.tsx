"use client";

import { StravaGearSimple } from "types";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

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
