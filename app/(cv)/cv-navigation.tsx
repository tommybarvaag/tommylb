"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { cn } from "../_lib/utils";

const navItems = {
  "/cv/about": {
    name: "About"
  },
  "/cv/experience": {
    name: "Experience"
  },
  "/cv/project": {
    name: "Projects"
  },
  "/cv/recommendation": {
    name: "Recommendations"
  }
};

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
          <div className="cv-nav-item absolute inset-0 top-7 mx-1 h-px bg-zinc-400 lg:mx-2" />
        ) : null}
      </span>
    </Link>
  );
}

function CvNavigation() {
  return (
    <div className="mb-6 ml-[-8px] tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            <Suspense fallback={null}>
              {Object.entries(navItems).map(([path, { name }]) => {
                return <CvNavItem key={path} path={path} name={name} />;
              })}
            </Suspense>
          </div>
        </nav>
      </div>
    </div>
  );
}

export { CvNavigation };
