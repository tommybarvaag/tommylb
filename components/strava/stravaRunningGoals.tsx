import * as React from "react";
import { StravaGoal } from "types";
import StravaGoalsSkeleton from "../skeleton/stravaGoalsSkeleton";
import useStravaStats from "./hooks/useStravaStats";
import StravaHeadingAndValues from "./stravaHeadingAndValues";

type StravaRunningGoalsProps = {
  title?: string;
  goals?: StravaGoal[];
  center?: boolean;
};
export default function StravaRunningGoals({
  title,
  goals = [],
  center,
  ...other
}: StravaRunningGoalsProps) {
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
