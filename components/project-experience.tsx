"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  ListItemWithTimeline,
  ListItemWithTimelineDescription,
  ListItemWithTimelineTitle
} from "@/components/cv-list-item-with-timeline";
import { CvTime } from "@/components/cv-time";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle
} from "@/components/drawer";
import { Gallery } from "@/components/gallery";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";
import { type ProjectExperienceItem } from "@/data/project-experience-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProjectExperience({
  projectExperience,
  isRouteIntercepted = false
}: {
  projectExperience: ProjectExperienceItem;
  isRouteIntercepted?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Drawer
      open={open}
      swipeDirection="down"
      onOpenChange={open => {
        setOpen(open);

        if (!open) {
          if (isRouteIntercepted) {
            router.back();
            return;
          }

          router.push("/cv/project");
          router.refresh();
        }
      }}
    >
      <DrawerContent variant="scrollable">
        <DrawerClose
          render={
            <Button className="absolute top-3 right-3 z-40 size-10 rounded-full p-0">
              <Icons.X className="size-6" />
            </Button>
          }
        />
        <div className="relative h-[280px] w-full md:h-[480px] lg:h-[680px]">
          <Image
            className={cn(
              "rounded-t-[10px] border-x border-t border-border object-cover object-center brightness-90 select-none",
              {
                "object-top": projectExperience.images?.[0]?.bannerObjectPosition === "top",
                "object-center": projectExperience.images?.[0]?.bannerObjectPosition === "center",
                "object-bottom": projectExperience.images?.[0]?.bannerObjectPosition === "bottom"
              }
            )}
            src={projectExperience.images?.[0].src}
            alt={projectExperience.images?.[0].alt}
            fill
            draggable={false}
            priority
          />
        </div>
        <div className="space-y-8 border-x border-border px-8 pt-12 pb-8 md:px-12 lg:px-24">
          <DrawerTitle
            render={
              <div>
                <Heading className="mb-3 font-semibold" variant="h2" uppercase>
                  {projectExperience.clientName}
                </Heading>
                <Heading className="mb-4" variant="h1" prose>
                  {projectExperience.title}
                </Heading>
              </div>
            }
          />
          <CvTime fromDate={projectExperience.startDate} toDate={projectExperience.endDate} />
          <DrawerDescription
            render={
              <div>
                {projectExperience.description.map((desc, index) => (
                  <Text key={`desc-${index}`}>{desc}</Text>
                ))}
              </div>
            }
          />
          <div>
            <Heading className="mb-4" variant="h3" prose>
              Roles
            </Heading>
            <ul className="">
              {projectExperience.roles.map((role, index) => (
                <ListItemWithTimeline key={`${role.title}-${index}`}>
                  <ListItemWithTimelineTitle>{role.title}</ListItemWithTimelineTitle>
                  <ListItemWithTimelineDescription>
                    {role.description}
                  </ListItemWithTimelineDescription>
                </ListItemWithTimeline>
              ))}
            </ul>
            <Heading className="mb-4" variant="h3" prose>
              Technology
            </Heading>
            <ul className="flex flex-wrap gap-1">
              {projectExperience.technologies.map((technology, index) => (
                <li key={`${technology}-${index}`}>
                  <Badge>{technology}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <section>
            <Heading className="mb-4" variant="h3" prose>
              Screenshots
            </Heading>
            <div className="grid grid-cols-1 gap-y-6">
              <Gallery
                images={projectExperience.images.map(image => ({
                  src: image.src,
                  alt: image.alt
                }))}
              />
            </div>
          </section>
        </div>
        <div className="mt-auto h-24 border-x border-t border-border bg-background p-4"></div>
      </DrawerContent>
    </Drawer>
  );
}

export { ProjectExperience };
