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
    <Link className="group" href={href} {...other}>
      <div className="flex items-start justify-between">
        <div>
          <Heading variant="h3" noMargin>
            {title}
          </Heading>
          <Heading className="text-sm text-zinc-400" variant="h4" noMargin>
            {subtitle}
          </Heading>
          <CvTime fromDate={fromDate} toDate={toDate} />
        </div>
        <Icons.ArrowRight
          className={cn(
            "h-5 w-5 text-zinc-400 transition-all group-hover:-rotate-90 group-hover:text-zinc-50",
            {
              "-rotate-90 text-zinc-50": isActive
            }
          )}
        />
      </div>
      <Text variant="small">{summary}</Text>
    </Link>
  );
}

export { ProjectExperienceLink };
