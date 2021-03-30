import clsx from "clsx";
import * as React from "react";

export default function Button({ children, className, ...other }) {
  return (
    <button
      className={clsx(
        "bg-black dark:bg-white text-gray-100 dark:text-gray-900 hover:text-gray-500 dark:hover:bg-gray-600 hover:text-gray-500 dark:hover:bg-gray-600 rounded-md p-3 my-6 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
}
