import * as React from "react";
import { Flex, Heading } from "theme-ui";

export default function StravaUnitOfMeasurement({ title, value, ...other }) {
  return (
    <Flex sx={{ flexDirection: "column", mb: 2, mr: 3 }} {...other}>
      <Heading as="h6" sx={{ mb: 0, fontWeight: "body" }}>
        {title}
      </Heading>
      <Heading as="h3">{value}</Heading>
    </Flex>
  );
}
