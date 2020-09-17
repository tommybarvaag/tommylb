import * as React from "react";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

export default function StravaRunningGoals({ title, goals = [] }) {
  const { stats } = useStravaStats();

  const nameAndValues = goals.length > 0 ? goals : stats?.goals;

  return nameAndValues ? (
    <StravaHeadingAndValues title={title ?? "Goals"} nameAndValues={nameAndValues} />
  ) : null;
}
