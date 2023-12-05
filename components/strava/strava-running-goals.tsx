"use client";

import StravaGoalsSkeleton from "@/components/skeleton/strava-goals-skeleton";
import StravaHeadingAndValues from "@/components/strava/strava-heading-and-values";
import { StravaGoal, StravaStats } from "@/types";

type StravaRunningGoalsProps = {
  stats: StravaStats;
  title?: string;
  goals?: StravaGoal[];
  center?: boolean;
};
export default function StravaRunningGoals({
  stats,
  title,
  goals = [],
  center,
  ...other
}: StravaRunningGoalsProps) {
  const nameAndValues = goals.length > 0 ? goals : stats?.goals;

  const renderStravaHeadingAndValues = () => {
    return nameAndValues ? (
      <StravaHeadingAndValues title={title ?? "Goals"} nameAndValues={nameAndValues} {...other} />
    ) : (
      <StravaGoalsSkeleton />
    );
  };

  return center ? (
    <div className="mx-auto mt-8 flex min-w-1/2 items-start">{renderStravaHeadingAndValues()}</div>
  ) : (
    renderStravaHeadingAndValues()
  );
}
