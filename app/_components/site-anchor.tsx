"use client";

import { Link } from "@/app/_components/ui/link";
import { unstable_ViewTransition as ViewTransition } from "react";

function SiteAnchor() {
  return (
    <ViewTransition name="site-anchor">
      <Link href="/" className="site-anchor font-medium" isUnderlineDisabled>
        Tommy Lunde Barvåg
      </Link>
    </ViewTransition>
  );
}

export { SiteAnchor };
