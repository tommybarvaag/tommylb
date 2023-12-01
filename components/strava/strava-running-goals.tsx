"use client";

import StravaGoalsSkeleton from "@/components/skeleton/strava-goals-skeleton";
import useStravaStats from "@/components/strava/hooks/use-strava-stats";
import StravaHeadingAndValues from "@/components/strava/strava-heading-and-values";
import { StravaGoal } from "@/types";

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
    <div className="mx-auto mt-8 flex min-w-1/2 items-start">{renderStravaHeadingAndValues()}</div>
  ) : (
    renderStravaHeadingAndValues()
  );
}
