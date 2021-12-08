import * as React from "react";
import { StravaActivity as StravaActivityType } from "types";
import Heading from "../heading";
import useStravaActivities from "./hooks";
import StravaActivity from "./stravaActivity";

type LastStravaActivityProps = {
  initialActivities: StravaActivityType[];
};

export default function LastStravaActivity({
  initialActivities = [],
  ...other
}: LastStravaActivityProps) {
  const { lastActivity, lastRunActivity } = useStravaActivities({
    fallbackData: initialActivities
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
