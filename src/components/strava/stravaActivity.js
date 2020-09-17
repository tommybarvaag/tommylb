import * as React from "react";
import { Box, Card, Divider, Flex, Heading } from "theme-ui";
import { getFormattedLongDate } from "../../utils/dateUtils";
import { Fire } from "../icons";
import NavLink from "../navLink";
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

  const boxProps = linkToStravaPage
    ? {
        as: NavLink,
        variant: "cards.primary",
        href: "/strava"
      }
    : {
        as: Card,
        variant: "cards.primary"
      };

  return (
    <Box {...boxProps} {...other}>
      <Flex>
        <Heading as="h3" variant="no-margin">
          {activity.type}
        </Heading>
        <Heading as="h3" variant="no-margin" sx={{ fontWeight: "body" }}>
          &nbsp;-&nbsp;{getFormattedLongDate(activity.startDateLocal)}
        </Heading>
      </Flex>
      {activity.personalBests.map((personalBest, index) => (
        <Flex key={`strava-personal-best-${activity.id}-${index}`} sx={{ alignItems: "center" }}>
          <Fire width={16} height={16} sx={{ mr: 2 }} />
          <Heading as="h5" sx={{ mb: 0 }}>
            {`Personal best ${personalBest.name} (${personalBest.formattedMovingTime})`}
          </Heading>
        </Flex>
      ))}
      <Divider />
      <Flex sx={{ flexWrap: "wrap" }}>{renderStravaStats()}</Flex>
    </Box>
  );
}
