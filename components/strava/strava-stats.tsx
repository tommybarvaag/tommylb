"use client";

import { Heading } from "@/components/heading";
import StravaGear from "@/components/strava/strava-gear";
import StravaNameAndValue from "@/components/strava/strava-name-and-value";
import StravaPersonalBests from "@/components/strava/strava-personal-bests";
import StravaRunningGoals from "@/components/strava/strava-running-goals";
import { StravaStats as StravaStatsType } from "@/types";
import { ComponentPropsWithoutRef } from "react";

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
      <Heading className="mb-3">{title}</Heading>
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

type StravaStatsProps = ComponentPropsWithoutRef<"div"> & {
  stats: StravaStatsType;
};

export default function StravaStats({ stats, ...other }: StravaStatsProps) {
  return (
    <div className="my-12 grid sm:grid-cols-1 sm:gap-0 md:grid-cols-2 md:gap-12" {...other}>
      <div>
        <StravaRunningGoals stats={stats} goals={stats?.goals ?? []} />
        <StravaPersonalBests stats={stats} personalBests={stats?.personalBests ?? []} />
        <StravaGear stats={stats} gear={stats?.gear ?? []} />
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
