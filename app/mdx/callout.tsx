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
        "border-zinc-950 bg-zinc-800": type === "default",
        "border-red-950 bg-red-800": type === "danger",
        "border-amber-950 bg-amber-800": type === "warning",
        "border-slate-950 bg-slate-800": type === "info"
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className="first-of-type:[&>p]:mt-0">{children}</div>
    </div>
  );
}
