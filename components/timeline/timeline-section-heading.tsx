import { Heading } from "@/components/heading";
import * as React from "react";

type TimelineSectionHeadingProps = {
  children: React.ReactNode;
};

export default function TimelineSectionHeading({ children }: TimelineSectionHeadingProps) {
  return (
    <Heading variant="h3" className="!mb-2">
      {children}
    </Heading>
  );
}
