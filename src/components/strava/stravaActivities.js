import * as React from "react";
import { Button, Container, Flex } from "theme-ui";
import ContainerHeading from "../containerHeading";
import useStravaActivities from "./hooks";
import StravaActivity from "./stravaActivity";

export default function StravaActivities({ preloadedActivities = [], ...other }) {
  const [activitiesToShow, setActivitiesToShow] = React.useState(10);
  const { activities } = useStravaActivities({
    initialData: preloadedActivities
  });

  const renderShowAllActivitiesButton = () => {
    if (activitiesToShow === activities?.length) {
      return null;
    }

    return (
      <Button onClick={() => setActivitiesToShow(activities.length)}>Show all activities</Button>
    );
  };

  return (
    <Container {...other}>
      <ContainerHeading>All Strava activities</ContainerHeading>
      {(activities ?? []).slice(0, activitiesToShow).map(activity => (
        <StravaActivity key={activity.id} activity={activity} />
      ))}
      <Flex variant="layout.center" sx={{ mt: 4 }}>
        {renderShowAllActivitiesButton()}
      </Flex>
    </Container>
  );
}
