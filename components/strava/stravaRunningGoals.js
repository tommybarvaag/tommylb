import * as React from "react";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

export default function StravaRunningGoals({ title, goals = [], center, ...other }) {
  const { stats } = useStravaStats();

  const nameAndValues = goals.length > 0 ? goals : stats?.goals;

  return nameAndValues ? (
    center ? (
      <div className="flex justify-center items-center w-full">
        <StravaHeadingAndValues title={title ?? "Goals"} nameAndValues={nameAndValues} {...other} />
      </div>
    ) : (
      <StravaHeadingAndValues title={title ?? "Goals"} nameAndValues={nameAndValues} {...other} />
    )
  ) : null;
}
