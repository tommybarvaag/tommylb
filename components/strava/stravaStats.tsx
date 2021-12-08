import * as React from "react";
import { StravaStats as StravaStatsType } from "types";
import Heading from "../heading";
import useStravaStats from "./hooks/useStravaStats";
import StravaGear from "./stravaGear";
import StravaNameAndValue from "./stravaNameAndValue";
import StravaPersonalBests from "./stravaPersonalBests";
import StravaRunningGoals from "./stravaRunningGoals";

type StravaActivityCountAndDistanceOverviewProps = {
  title: string;
  activityCountAndDistanceOverview: {
    activityCount: number;
    activityRunningCount: number;
    totalDistanceCovered: number;
    totalRunningDistanceCovered: number;
  };
};

function StravaActivityCountAndDistanceOverview({
  title,
  activityCountAndDistanceOverview,
  ...other
}: StravaActivityCountAndDistanceOverviewProps) {
  return (
    <div className="mb-12" {...other}>
      <Heading>{title}</Heading>
      <StravaNameAndValue
        name="Activities"
        value={activityCountAndDistanceOverview.activityCount}
      />
      <StravaNameAndValue
        name="Run activities"
        value={activityCountAndDistanceOverview.activityRunningCount}
      />
      <StravaNameAndValue
        name="Total distance"
        value={`${activityCountAndDistanceOverview.totalDistanceCovered} km`}
      />
      <StravaNameAndValue
        name="Total running distance"
        value={`${activityCountAndDistanceOverview.totalRunningDistanceCovered} km`}
      />
    </div>
  );
}

type StravaStatsProps = {
  initialStats: StravaStatsType;
};

export default function StravaStats({ initialStats, ...other }: StravaStatsProps) {
  const { stats } = useStravaStats({
    fallbackData: initialStats
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:gap-0 md:gap-12 my-12" {...other}>
      <div>
        <StravaRunningGoals goals={stats?.goals ?? []} />
        <StravaPersonalBests personalBests={stats?.personalBests ?? []} />
        <StravaGear gear={stats?.gear ?? []} />
      </div>
      <div>
        <StravaActivityCountAndDistanceOverview
          title="This year"
          activityCountAndDistanceOverview={stats.thisYear}
        />
        <StravaActivityCountAndDistanceOverview
          title="Last year"
          activityCountAndDistanceOverview={stats.lastYear}
        />
        <StravaActivityCountAndDistanceOverview
          title="All time"
          activityCountAndDistanceOverview={stats.allTime}
        />
      </div>
    </div>
  );
}
