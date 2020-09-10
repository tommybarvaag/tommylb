import * as React from "react";
import { Container, Grid } from "theme-ui";
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
      <Grid gap={[0, 0, 2]} columns={[1, 1, 2]}>
        <StravaActivity activity={lastActivity} linkToStravaPage />
        <StravaActivity activity={lastRunActivity} linkToStravaPage />
      </Grid>
    );
  };

  return (
    <Container {...other}>
      <ContainerHeading>Latest Strava action</ContainerHeading>
      {renderLastStravaActivity()}
    </Container>
  );
}
