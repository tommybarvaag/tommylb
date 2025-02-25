import { cn } from "@/app/_lib/utils";
import * as React from "react";

const Card = function ({ className, ...other }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-card text-card-foreground rounded-xl border shadow-sm", className)}
      {...other}
    />
  );
};

const CardHeader = function ({ className, ...other }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...other} />;
};

const CardTitle = function ({ className, ...other }: React.ComponentProps<"div">) {
  return <div className={cn("font-semibold leading-none tracking-tight", className)} {...other} />;
};

const CardDescription = function ({ className, ...other }: React.ComponentProps<"div">) {
  return <div className={cn("text-muted-foreground text-sm", className)} {...other} />;
};

const CardContent = function ({ className, ...other }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...other} />;
};

const CardFooter = function ({ className, ...other }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...other} />;
};

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
