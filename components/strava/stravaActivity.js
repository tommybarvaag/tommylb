import * as React from "react";
import { getFormattedLongDate } from "../../utils/dateUtils";
import Heading from "../heading";
import { Fire } from "../icons";
import Text from "../text";
import StravaUnitOfMeasurement from "./stravaUnitOfMeasurement";

export default function StravaActivity({ activity, linkToStravaPage = false, ...other }) {
  const renderHeartRate = () => {
    return activity.hasHeartRate ? (
      <StravaUnitOfMeasurement title="Heart rate " value={`${activity.averageHeartRate} bpm`} />
    ) : null;
  };

  const renderStravaStats = () => {
    switch (activity.type) {
      case "Run":
        return (
          <>
            <StravaUnitOfMeasurement title="Time" value={activity.formattedMovingTime} />
            <StravaUnitOfMeasurement
              title="Distance"
              value={`${activity.distanceInKilometers} km`}
            />
            {renderHeartRate()}
            <StravaUnitOfMeasurement title="Pace" value={`${activity.minutesPerKilometer} mpk`} />
            <StravaUnitOfMeasurement title="Speed" value={`${activity.kilometersPerSecond} kph`} />
          </>
        );
      default:
        return (
          <>
            <StravaUnitOfMeasurement
              title="Distance"
              value={`${activity.distanceInKilometers} km`}
            />
            <StravaUnitOfMeasurement title="Time" value={activity.formattedMovingTime} />
            {renderHeartRate()}
            <StravaUnitOfMeasurement
              title="Elevation gain"
              value={`${activity.totalElevationGain} m`}
            />
          </>
        );
    }
  };

  return (
    <a
      className="block w-full p-6 mb-12 border border-black dark:border-white rounded-xl divide-y divide-black dark:divide-white"
      href={linkToStravaPage ? "/strava" : "#"}
      {...other}
    >
      <div className="flex items-center">
        <Heading as="h3" className="mb-0">
          {activity.type}
        </Heading>
        <Text className="mx-3 mb-0">-</Text>
        <Text className="mb-0">{getFormattedLongDate(activity.startDateLocal)}</Text>
      </div>
      {activity.personalBests.map((personalBest, index) => (
        <div
          className="flex items-center mt-4 pt-4"
          key={`strava-personal-best-${activity.id}-${index}`}
        >
          <Fire width={16} height={16} className="mr-3" />
          <Heading as="g6" className="mb-0">
            {`Personal best ${personalBest.name} (${personalBest.formattedMovingTime})`}
          </Heading>
        </div>
      ))}
      <div className="flex flex-wrap mt-4 pt-4">{renderStravaStats()}</div>
    </a>
  );
}
