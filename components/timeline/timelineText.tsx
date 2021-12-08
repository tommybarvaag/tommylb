import * as React from "react";

type TimelineTextProps = {
  children: React.ReactNode;
};

export default function TimelineText({ children }: TimelineTextProps) {
  return <div className="ml-16 text-gray-400">{children}</div>;
}
