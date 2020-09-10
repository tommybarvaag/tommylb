import * as React from "react";
import { Container } from "theme-ui";
import ContainerHeading from "../containerHeading";
import useStravaActivities from "./hooks";
import StravaActivity from "./stravaActivity";

export default function LastStravaActivity({ preloadedActivities = [], ...other }) {
  const { lastActivity, lastRunActivity } = useStravaActivities({
    initialData: preloadedActivities
  });

  const renderLastStravaActivity = () => {
    if (lastActivity.type === "Run") {
      return <StravaActivity activity={lastActivity} linkToStravaPage />;
    }

    return (
      <>
        <StravaActivity activity={lastActivity} linkToStravaPage />
        <StravaActivity activity={lastRunActivity} linkToStravaPage />
      </>
    );
  };

  return (
    <Container {...other}>
      <ContainerHeading>Latest Strava action</ContainerHeading>
      {renderLastStravaActivity()}
    </Container>
  );
}
