import * as React from "react";
import Heading from "../heading";

type TimelineSectionHeadingProps = {
  children: React.ReactNode;
};

export default function TimelineSectionHeading({ children }: TimelineSectionHeadingProps) {
  return (
    <Heading as="h3" className="!mb-2">
      {children}
    </Heading>
  );
}
