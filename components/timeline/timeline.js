import * as React from "react";

export default function Timeline({ children }) {
  return (
    <div className="relative m-8">
      <ul className="list-none m-0 p-0">{children}</ul>
    </div>
  );
}
