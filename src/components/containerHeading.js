import * as React from "react";
import { Heading } from "theme-ui";

export default function ContainerHeading({ children, as = "h2", ...other }) {
  return (
    <Heading as={as} sx={{ fontSize: [4, 4, 5] }} {...other}>
      {children}
    </Heading>
  );
}
