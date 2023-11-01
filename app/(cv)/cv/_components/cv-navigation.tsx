"use client";

import { LayoutGroup } from "framer-motion";
import { Suspense } from "react";
import { CvNavItem } from "./cv-nav-item";

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

function CvNavigation() {
  return (
    <div className="mb-6 ml-[-8px] tracking-tight">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              <Suspense fallback={null}>
                {Object.entries(navItems).map(([path, { name }]) => {
                  return <CvNavItem key={path} path={path} name={name} />;
                })}
              </Suspense>
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </div>
  );
}

export { CvNavigation };
