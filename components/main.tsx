import * as React from "react";

type MainProps = {
  children: React.ReactNode;
}

export default function Main({ children, ...other }: MainProps) {
  return (
    <main
      className="flex flex-col flex-grow justify-start bg-white dark:bg-black px-8 items-start max-w-2xl mx-auto mb-16"
      {...other}
    >
      {children}
    </main>
  );
}
