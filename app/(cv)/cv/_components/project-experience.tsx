"use client";

import { CvTime } from "@/app/(cv)/cv/_components/cv-time";
import { type ProjectExperienceItem } from "@/app/(cv)/cv/_data/project-experience-data";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import {
  ListItemWithTimeline,
  ListItemWithTimelineDescription,
  ListItemWithTimelineTitle
} from "./cv-list-item-with-timeline";

function ProjectExperience({ projectExperience }: { projectExperience: ProjectExperienceItem }) {
  const router = useRouter();

  return (
    <>
      <Drawer.Root
        open
        onOpenChange={open => {
          if (!open) {
            if (document.referrer) {
              router.back();
            } else {
              router.push("/cv/project");
            }
          }
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 mx-auto mt-24 flex h-full max-h-[96%] max-w-[1080px] flex-col rounded-t-[10px] bg-zinc-900">
            <div className="relative z-10 flex-1 overflow-auto rounded-t-[10px]">
              <Drawer.Close asChild>
                <Button className="fixed right-3 top-3 z-20 h-10 w-10 rounded-full p-0">
                  <Icons.X className="h-6 w-6" />
                </Button>
              </Drawer.Close>
              <div className="relative h-[280px] w-full md:h-[480px] lg:h-[680px]">
                <Image
                  className="select-none rounded-t-[10px] border-x border-t border-zinc-900 brightness-90"
                  src={projectExperience.images?.[0].src}
                  alt={projectExperience.images?.[0].alt}
                  fill
                  objectFit="cover"
                  objectPosition="center top"
                />
              </div>
              <div className="space-y-8 border-x border-zinc-900 px-8 pb-8 pt-12 md:px-12 lg:px-24">
                <Drawer.Title asChild>
                  <Heading variant="h1" prose>
                    {projectExperience.title}
                  </Heading>
                </Drawer.Title>
                <CvTime fromDate={projectExperience.startDate} toDate={projectExperience.endDate} />
                <Drawer.Description asChild>
                  <>
                    {projectExperience.description.map((desc, index) => (
                      <Text key={`desc-${index}`}>{desc}</Text>
                    ))}
                  </>
                </Drawer.Description>
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
                    {projectExperience.images?.map((image, index) => (
                      <Image
                        key={`${image.src}-${index}`}
                        className="mx-auto select-none rounded-[10px]"
                        src={image.src}
                        alt={image.alt}
                        width={image.width ?? 800}
                        height={image.height ?? 400}
                      />
                    ))}
                  </div>
                </section>
              </div>
              <div className="mt-auto h-24 border-x border-t border-zinc-900 border-t-zinc-800 bg-zinc-900 p-4"></div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export { ProjectExperience };
