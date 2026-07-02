"use client";

import { ComponentPropsWithoutRef, useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { CvTime } from "@/components/cv-time";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";

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
      className="group/link peer pointer-events-auto cursor-pointer lg:transition-colors lg:duration-500 lg:group-hover:text-muted-foreground lg:hover:text-foreground!"
      href={href}
      {...other}
    >
      <div className="flex items-start justify-between">
        <div>
          <Heading
            className="mb-1 text-inherit underline decoration-muted-foreground underline-offset-[2.5px] transition-[text-decoration] duration-500 group-hover/link:decoration-inherit"
            variant="h3"
          >
            {title}
          </Heading>
          <Heading
            className="text-sm text-muted-foreground lg:transition-colors lg:duration-500 lg:group-hover:text-muted-foreground lg:group-hover/link:text-muted-foreground!"
            variant="h4"
            noMargin
          >
            {subtitle}
          </Heading>
          <CvTime
            className="text-muted-foreground lg:transition-colors lg:duration-500 lg:group-hover:text-muted-foreground lg:group-hover/link:text-muted-foreground!"
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
        <Icons.ArrowRight
          className={cn(
            "size-5 text-muted-foreground transition-all group-hover/link:-rotate-90 group-hover/link:text-foreground",
            {
              "-rotate-90 text-foreground": isActive
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
