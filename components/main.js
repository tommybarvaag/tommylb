import * as React from "react";

export default function Main({ children, ...other }) {
  return (
    <main
      className="flex flex-col flex-grow justify-start bg-white dark:bg-black px-8 items-start max-w-2xl mx-auto mb-16"
      {...other}
    >
      {children}
    </main>
  );
}
