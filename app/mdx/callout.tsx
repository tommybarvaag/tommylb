import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger" | "info";
}

export function Callout({ children, icon, type = "default", ...props }: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-lg border border-l-4 p-4", {
        "border-border bg-muted": type === "default",
        "border-red-300 bg-red-100 dark:border-red-950 dark:bg-red-950/40": type === "danger",
        "border-amber-300 bg-amber-100 dark:border-amber-950 dark:bg-amber-950/40":
          type === "warning",
        "border-slate-300 bg-slate-100 dark:border-slate-950 dark:bg-slate-800/60": type === "info"
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className="first-of-type:[&>p]:mt-0">{children}</div>
    </div>
  );
}
