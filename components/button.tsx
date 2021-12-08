import clsx from "clsx";
import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button({
  children,
  className,
  leftIcon,
  rightIcon,
  type = "button",
  ...other
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "bg-black dark:bg-white text-gray-100 dark:text-gray-900 hover:text-gray-500 dark:hover:bg-gray-600 rounded-md p-3 px-8 mb-6 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
        className
      )}
      {...other}
    >
      {leftIcon ? <div className="mr-2">{leftIcon}</div> : null}
      {children}
      {rightIcon ? <div className="ml-2">{rightIcon}</div> : null}
    </button>
  );
}
