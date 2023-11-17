"use client";

import { CvTime } from "@/components/cv-time";
import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { Icons } from "./icons";

function ProjectExperienceLink({
  href,
  title,
  subtitle,
  fromDate,
  toDate,
  summary,
  ...other
}: ComponentPropsWithoutRef<typeof Link> & {
  title: string;
  subtitle: string;
  fromDate: string;
  toDate: string;
  summary: string;
}) {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <Link
      className="group/link peer pointer-events-auto cursor-pointer transition-colors duration-500 hover:!text-zinc-50 group-hover:text-zinc-500"
      href={href}
      {...other}
    >
      <div className="flex items-start justify-between">
        <div>
          <Heading className="text-inherit" variant="h3" noMargin>
            {title}
          </Heading>
          <Heading
            className="text-sm text-zinc-400 transition-colors duration-500 group-hover/link:text-zinc-400 group-hover:text-zinc-500"
            variant="h4"
            noMargin
          >
            {subtitle}
          </Heading>
          <CvTime
            className="text-zinc-400 transition-colors duration-500 group-hover/link:text-zinc-400 group-hover:text-zinc-500"
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
        <Icons.ArrowRight
          className={cn(
            "h-5 w-5 text-zinc-400 transition-all group-hover/link:-rotate-90 group-hover/link:text-zinc-50",
            {
              "-rotate-90 text-zinc-50": isActive
            }
          )}
        />
      </div>
      <Text className="" variant="small">
        {summary}
      </Text>
    </Link>
  );
}

export { ProjectExperienceLink };
