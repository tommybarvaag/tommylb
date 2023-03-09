import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({ children, icon, type = "default", ...props }: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-lg border border-l-4 p-4", {
        "border-zinc-700 bg-zinc-800": type === "default",
        "border-red-900 bg-red-800": type === "danger",
        "border-amber-900 bg-amber-800": type === "warning"
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className="first-of-type:[&>p]:mt-0">{children}</div>
    </div>
  );
}
