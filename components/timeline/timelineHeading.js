import * as React from "react";
import { ArrowNarrowRight } from "../icons";

export default function TimelineHeading({ children }) {
  return (
    <div className="flex items-center mb-1">
      <ArrowNarrowRight className="text-green-500 dark:text-green-400" />
      <div className="flex-1 ml-4 font-bold">{children}</div>
    </div>
  );
}
