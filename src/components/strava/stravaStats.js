import * as React from "react";
import { Container, Grid, Heading } from "theme-ui";
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
    <Container mt={0} {...other}>
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
    </Container>
  );
}

export default function StravaStats({ preloadedStats, ...other }) {
  const { stats } = useStravaStats({
    initialData: preloadedStats
  });

  return (
    <Container {...other}>
      <Grid columns={[1, 2, 2]} gap={5}>
        <Container m={0}>
          <StravaRunningGoals goals={stats?.goals ?? []} />
          <StravaPersonalBests personalBests={stats?.personalBests ?? []} />
          <StravaGear gear={stats?.gear ?? []} />
        </Container>
        <Container m={0}>
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
        </Container>
      </Grid>
    </Container>
  );
}
