import { CvTime } from "@/components/cv-time";
import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export interface ListItemWithTimelineProps extends React.HTMLAttributes<HTMLDataListElement> {}

const ListItemWithTimeline = forwardRef<HTMLDivElement, ListItemWithTimelineProps>(
  ({ className, children, ...props }, ref) => (
    <li className="relative mb-10 ml-6 pl-6 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:left-[4px] [&:not(:last-child)]:before:top-8 [&:not(:last-child)]:before:h-full [&:not(:last-child)]:before:w-px [&:not(:last-child)]:before:bg-zinc-600">
      <span className="absolute left-0 top-2 flex size-[8.75px] rounded-full bg-zinc-600" />
      {children}
    </li>
  )
);
ListItemWithTimeline.displayName = "Card";

export interface ListItemWithTimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const ListItemWithTimelineTitle = forwardRef<HTMLDivElement, ListItemWithTimelineTitleProps>(
  ({ className, children, ...props }, ref) => (
    <Heading className={cn(className)} variant="h3" noMargin {...props}>
      {children}
    </Heading>
  )
);

ListItemWithTimelineTitle.displayName = "ListItemWithTimelineTitle";

export type ListItemWithTimelineTimeProps = ComponentPropsWithoutRef<typeof CvTime>;

const ListItemWithTimelineTime = forwardRef<
  ElementRef<typeof CvTime>,
  ListItemWithTimelineTimeProps
>(({ ...props }, ref) => <CvTime {...props} ref={ref} />);

ListItemWithTimelineTime.displayName = "ListItemWithTimelineTime";

export type ListItemWithTimelineDescriptionProps = ComponentPropsWithoutRef<typeof Text>;

const ListItemWithTimelineDescription = forwardRef<
  ElementRef<typeof Text>,
  ListItemWithTimelineDescriptionProps
>(({ className, children, variant = "small", ...props }, ref) => (
  <Text className={cn("", className)} variant={variant} {...props} ref={ref}>
    {children}
  </Text>
));

ListItemWithTimelineDescription.displayName = "ListItemWithTimelineDescription";

export {
  ListItemWithTimeline,
  ListItemWithTimelineDescription,
  ListItemWithTimelineTime,
  ListItemWithTimelineTitle
};
