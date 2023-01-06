import * as React from "react";

const Show = ({ children, when }: { children?: React.ReactNode; when: boolean }) => {
  return when ? <>{children}</> : null;
};

export { Show };
