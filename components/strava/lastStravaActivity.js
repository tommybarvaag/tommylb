import * as React from "react";
import Heading from "../heading";
import useStravaActivities from "./hooks";
import StravaActivity from "./stravaActivity";

export default function LastStravaActivity({ preloadedActivities = [], ...other }) {
  const { lastActivity, lastRunActivity } = useStravaActivities({
    initialData: preloadedActivities
  });

  const renderLastStravaActivity = () => {
    if (!lastActivity) {
      return null;
    }

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
    <div className="w-full" {...other}>
      <Heading>Latest Strava action</Heading>
      {renderLastStravaActivity()}
    </div>
  );
}
