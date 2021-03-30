import * as React from "react";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

export default function StravaGear({ title, gear = [], ...other }) {
  const { stats } = useStravaStats();

  const nameAndValues = (gear.length > 0 ? gear : stats?.gear ?? []).map(gear => ({
    name: gear.name,
    value: `${gear.distance} km`
  }));

  return (
    <StravaHeadingAndValues title={title ?? "Gear"} nameAndValues={nameAndValues} {...other} />
  );
}
