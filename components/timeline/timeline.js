import * as React from "react";
import Heading from "../heading";

export default function Timeline({ children, heading }) {
  return (
    <div className="relative">
      {heading ? <Heading className="!mb-2">{heading}</Heading> : null}
      <ul className="list-none m-0 p-0">{children}</ul>
    </div>
  );
}
