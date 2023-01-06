import * as React from "react";

type TimelineTextProps = {
  children: React.ReactNode;
};

export default function TimelineText({ children }: TimelineTextProps) {
  return <div className="ml-16 text-zinc-200">{children}</div>;
}
