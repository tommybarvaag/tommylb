import * as React from "react";
import Heading from "../heading";

export default function TimelineSectionHeading({ children }) {
  return (
    <Heading as="h4" className="!mb-2">
      {children}
    </Heading>
  );
}
