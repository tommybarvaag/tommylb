import * as React from "react";
import { Container, Flex, Grid, Heading, Text } from "theme-ui";
import useStravaStats from "./hooks/useStravaStats";

function StravaNameAndValue({ name, value }) {
  return (
    <Flex>
      <Text sx={{ flexGrow: 1, mr: 3 }}>{name}</Text>
      <Text sx={{ fontWeight: "bold" }}>{value}</Text>
    </Flex>
  );
}

function StravaHeadingAndValues({ title, nameAndValues = [] }) {
  if (nameAndValues?.length <= 0) {
    return null;
  }

  return (
    <Container>
      <Heading>{title}</Heading>
      {nameAndValues.map((nameAndValue, index) => (
        <StravaNameAndValue
          key={`${title}-name-and-value-${index}`}
          name={nameAndValue.name}
          value={nameAndValue.value}
        />
      ))}
    </Container>
  );
}

function StravaPersonalBests({ title, personalBests = [] }) {
  if (personalBests?.length <= 0) {
    return null;
  }

  return <StravaHeadingAndValues title={title ?? "Personal bests"} nameAndValues={personalBests} />;
}

function StravaRunningGoals({ title, goals = [] }) {
  if (goals?.length <= 0) {
    return null;
  }

  return <StravaHeadingAndValues title={title ?? "Goals"} nameAndValues={goals} />;
}

function StravaActivityCountAndDistanceOverview({ title, activityCountAndDistanceOverview }) {
  return (
    <Container>
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
