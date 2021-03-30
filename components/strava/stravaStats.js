import * as React from "react";
import Heading from "../heading";
import useStravaStats from "./hooks/useStravaStats";
import StravaGear from "./stravaGear";
import StravaNameAndValue from "./stravaNameAndValue";
import StravaPersonalBests from "./stravaPersonalBests";
import StravaRunningGoals from "./stravaRunningGoals";

function StravaActivityCountAndDistanceOverview({
  title,
  activityCountAndDistanceOverview,
  ...other
}) {
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

export default function StravaStats({ preloadedStats, ...other }) {
  const { stats } = useStravaStats({
    initialData: preloadedStats
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:gap-0 md:gap-12 my-12">
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
