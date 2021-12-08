import * as React from "react";

type TimelinePostProps = {
  children: React.ReactNode;
};

export default function TimelinePost({ children }: TimelinePostProps) {
  return <li className="mb-4">{children}</li>;
}
