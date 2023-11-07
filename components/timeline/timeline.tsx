import * as React from "react";
import { Heading } from "../heading";

type TimelineProps = {
  heading?: string;
  children: React.ReactNode;
};

export default function Timeline({ children, heading }: TimelineProps) {
  return (
    <div className="relative">
      {heading ? <Heading className="!mb-2">{heading}</Heading> : null}
      <ul className="m-0 list-none p-0">{children}</ul>
    </div>
  );
}
