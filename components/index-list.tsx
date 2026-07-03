import { Icons } from "@/components/icons";
import Link from "@/components/link";

type IndexListItemProps = {
  index: number;
  title: string;
  href: string;
  description?: string;
};

function IndexList({ children }: { children: React.ReactNode }) {
  return <ol className="mt-2 flex flex-col">{children}</ol>;
}

function IndexListItem({ index, title, href, description }: IndexListItemProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <li className="-mx-3 rounded-md transition-colors hover:bg-muted">
      <Link
        href={href}
        underline={false}
        showExternalLinkIcon={false}
        className="grid grid-cols-[1.75rem_1fr] items-baseline gap-x-3 p-3"
      >
        <span className="text-xs text-olive-500 tabular-nums dark:text-olive-300">
          {String(index).padStart(2, "0")}
        </span>
        <span className="min-w-0">
          <span className="font-medium text-foreground">
            {title}
            {isExternal ? (
              <Icons.ArrowUpRight className="ml-1 inline size-3.5 align-[-0.125em] text-olive-500 dark:text-olive-300" />
            ) : null}
          </span>
          {description ? (
            <span className="mt-0.5 block text-sm leading-normal text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
      </Link>
    </li>
  );
}

export { IndexList, IndexListItem };
