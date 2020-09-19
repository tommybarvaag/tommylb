import * as React from "react";
import { Heading } from "theme-ui";

export default function PageHeading({ children, as = "h1", ...other }) {
  return (
    <Heading as={as} sx={{ fontSize: [5, 5, 6] }} {...other}>
      {children}
    </Heading>
  );
}
