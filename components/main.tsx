import * as React from "react";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children, ...other }: MainProps) {
  return (
    <main
      className="mx-auto mb-16 flex w-full max-w-2xl flex-grow flex-col items-start justify-start bg-black px-8"
      {...other}
    >
      {children}
    </main>
  );
}
