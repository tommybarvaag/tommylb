import * as React from "react";
import { Box, Card, Divider, Flex, Heading } from "theme-ui";
import { getFormattedLongDate } from "../../utils/dateUtils";
import { Fire } from "../icons";
import Link from "../link";
import StravaStat from "./stravaStats";

export default function StravaActivity({ activity, linkToStravaPage = false, ...other }) {
  const renderStravaStats = () => {
    switch (activity.type) {
      case "Run":
        return (
          <>
            <StravaStat title="Time" value={activity.formattedMovingTime} />
            <StravaStat title="Distance" value={`${activity.distanceInKilometers} km`} />
            <StravaStat title="Heart rate" value={`${activity.averageHeartRate} bpm`} />
            <StravaStat title="Pace" value={`${activity.minutesPerKilometer} mpk`} />
            <StravaStat title="Speed" value={`${activity.kilometersPerSecond} kph`} />
          </>
        );
      default:
        return (
          <>
            <StravaStat title="Distance" value={`${activity.distanceInKilometers} km`} />
            <StravaStat title="Time" value={activity.formattedMovingTime} />
            <StravaStat title="Heart rate " value={`${activity.averageHeartRate} bpm`} />
            <StravaStat title="Elevation gain" value={`${activity.totalElevationGain} m`} />
          </>
        );
    }
  };

  const boxProps = linkToStravaPage
    ? {
        as: Link,
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
        <Heading as="h3">{activity.type}</Heading>
        <Heading as="h3" sx={{ fontWeight: "body" }}>
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
