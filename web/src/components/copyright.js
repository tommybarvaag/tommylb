import React from "react";
import { Text } from "theme-ui";

export default function Copyright() {
  return (
    <Text>
      {"Copyright © Tommy Lunde Barvåg "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}
