import * as React from "react";
import { Container, Heading } from "theme-ui";
import useStravaActivities from "./hooks";
import StravaActivity from "./stravaActivity";
import ContainerHeading from "../containerHeading";

export default function StravaActivities({ preloadedActivities = [], ...other }) {
  const { activities } = useStravaActivities({
    initialData: preloadedActivities
  });

  return (
    <Container {...other}>
      <ContainerHeading>All Strava activities</ContainerHeading>
      {activities.map(activity => (
        <StravaActivity key={activity.id} activity={activity} />
      ))}
    </Container>
  );
}
