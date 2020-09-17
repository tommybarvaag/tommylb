import * as React from "react";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

export default function StravaPersonalBests({ title, personalBests = [] }) {
  const { stats } = useStravaStats();

  const nameAndValues = personalBests.length > 0 ? personalBests : stats?.personalBests;

  return <StravaHeadingAndValues title={title ?? "Personal bests"} nameAndValues={nameAndValues} />;
}
