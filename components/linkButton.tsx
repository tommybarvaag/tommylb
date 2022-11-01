import clsx from "clsx";
import * as React from "react";
import Link from "./link";

type LinkButtonProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

export default function LinkButton({ children, className, href, ...other }: LinkButtonProps) {
  return (
    <Link href={href} className="block p-0 sm:p-0">
      <button
        className={clsx(
          "my-6 inline-flex items-center justify-center rounded-md bg-white p-3 text-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
          className
        )}
        {...other}
      >
        {children}
      </button>
    </Link>
  );
}
