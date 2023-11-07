"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CvNavItem({ path, name }: { path: string; name: string }) {
  let pathname = usePathname() ?? "/";
  const isActive = pathname === path || pathname.startsWith(path);

  return (
    <Link
      key={path}
      href={path}
      className={cn("flex align-middle transition-all hover:text-zinc-300", {
        "text-zinc-400": !isActive
      })}
    >
      <span className="relative p-1 lg:px-2">
        {name}
        {isActive ? (
          <motion.div
            className="absolute inset-0 top-7 mx-1 h-[1px] bg-zinc-400 lg:mx-2"
            layoutId="sidebar"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30
            }}
          />
        ) : null}
      </span>
    </Link>
  );
}

export { CvNavItem };
