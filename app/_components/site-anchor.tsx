"use client";

import { Link } from "@/app/_components/ui/link";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, unstable_ViewTransition as ViewTransition } from "react";

function SiteAnchor() {
  const pathname = usePathname();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <ViewTransition name="site-anchor">
      <Link
        href="/"
        className="site-anchor flex items-center gap-x-1 font-medium"
        isUnderlineDisabled
      >
        {!isHome ? <ChevronLeft className="-ml-1 size-3.5" /> : null}
        Tommy Lunde Barvåg
      </Link>
    </ViewTransition>
  );
}

export { SiteAnchor };
