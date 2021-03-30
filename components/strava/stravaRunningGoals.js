import * as React from "react";
import StravaGoalsSkeleton from "../skeleton/stravaGoalsSkeleton";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

export default function StravaRunningGoals({ title, goals = [], center, ...other }) {
  const { stats } = useStravaStats();

  const nameAndValues = goals.length > 0 ? goals : stats?.goals;

  const renderStravaHeadingAndValues = () => {
    return nameAndValues ? (
      <StravaHeadingAndValues title={title ?? "Goals"} nameAndValues={nameAndValues} {...other} />
    ) : (
      <StravaGoalsSkeleton />
    );
  };

  return center ? (
    <div className="flex min-w-1/2 mt-8 mx-auto items-start">{renderStravaHeadingAndValues()}</div>
  ) : (
    renderStravaHeadingAndValues()
  );
}
