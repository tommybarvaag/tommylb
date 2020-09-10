import * as React from "react";
import { Box, Card, Divider, Flex, Heading } from "theme-ui";
import { getFormattedLongDate } from "../../utils/dateUtils";
import { Calendar, Fire } from "../icons";
import Link from "../link";
import StravaStat from "./stravaStats";

export default function StravaActivity({ activity, linkToStravaPage = false, ...other }) {
  const renderStravaStats = () => {
    switch (activity.type) {
      case "Run":
        return (
          <>
            <StravaStat title="Time" value={activity.formattedMovingTime} />
            <StravaStat title="Distance" value={activity.distanceInKilometers} />
            <StravaStat title="Heart rate " value={activity.averageHeartRate} />
            <StravaStat title="Minutes per kilometer" value={activity.minutesPerKilometer} />
            <StravaStat title="Kilometers per hour" value={activity.kilometersPerSecond} />
          </>
        );
      default:
        return (
          <>
            <StravaStat title="Distance" value={activity.distanceInKilometers} />
            <StravaStat title="Time" value={activity.formattedMovingTime} />
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
      <Heading as="h3">{activity.type}</Heading>
      <Flex sx={{ alignItems: "center" }}>
        <Calendar width={16} height={16} sx={{ mr: 2 }} />
        <Heading as="h5" sx={{ mb: 0 }}>
          {getFormattedLongDate(activity.startDateLocal)}
        </Heading>
      </Flex>
      {activity.personalBests.map(personalBest => (
        <Flex sx={{ alignItems: "center" }}>
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
