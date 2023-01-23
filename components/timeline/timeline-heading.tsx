import * as React from "react";
import { Icons } from "../icons";

type TimelineHeadingProps = {
  children: React.ReactNode;
};

export default function TimelineHeading({ children }: TimelineHeadingProps) {
  return (
    <div className="mb-1 flex items-center">
      <Icons.ArrowRight className="text-green-400" />
      <div className="ml-4 flex-1 font-bold">{children}</div>
    </div>
  );
}
