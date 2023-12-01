"use client";

import { CvTime } from "@/components/cv-time";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, useMemo } from "react";

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
      className="group/link peer pointer-events-auto cursor-pointer lg:transition-colors lg:duration-500 lg:hover:!text-zinc-50 lg:group-hover:text-zinc-500"
      href={href}
      {...other}
    >
      <div className="flex items-start justify-between">
        <div>
          <Heading
            className="mb-1 text-inherit underline decoration-zinc-500 underline-offset-[2.5px] transition-[text-decoration] duration-500 group-hover/link:decoration-inherit"
            variant="h3"
          >
            {title}
          </Heading>
          <Heading
            className="text-sm text-zinc-400 lg:transition-colors lg:duration-500 lg:group-hover/link:!text-zinc-400 lg:group-hover:text-zinc-500"
            variant="h4"
            noMargin
          >
            {subtitle}
          </Heading>
          <CvTime
            className="text-zinc-400 lg:transition-colors lg:duration-500 lg:group-hover/link:!text-zinc-400 lg:group-hover:text-zinc-500"
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
