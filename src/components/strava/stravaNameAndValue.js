import * as React from "react";
import { Flex, Text } from "theme-ui";

export default function StravaNameAndValue({ name, value, ...other }) {
  return (
    <Flex {...other}>
      <Text sx={{ flexGrow: 1, mr: 3 }}>{name}</Text>
      <Text sx={{ fontWeight: "bold" }}>{value}</Text>
    </Flex>
  );
}
