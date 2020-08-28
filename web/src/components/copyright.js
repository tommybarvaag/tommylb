import React from "react";
import { Text } from "theme-ui";

export default function Copyright() {
  return (
    <Text variant="body2" color="textSecondary" align="center">
      {"Copyright © Tommy Lunde Barvåg "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}
