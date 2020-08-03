import React from "react";
import { Typography } from "./typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Tommy Lunde Barvåg "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
