import * as React from "react";

type TimelineSectionProps = {
  children: React.ReactNode
};

export default function TimelineSection({ children }: TimelineSectionProps) {
  return <div className="mb-8">{children}</div>;
}
