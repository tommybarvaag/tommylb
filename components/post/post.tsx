import Heading from "../heading";
import Link from "../link";
import Text from "../text";

type PostProps = {
  title: string;
  summary: string;
  href: string;
  publishedAt: string;
};

export default function Post({ title, summary, href, publishedAt, ...other }: PostProps) {
  return (
    <Link
      href={href}
      className="block w-full !p-6 mb-12 border border-black dark:border-white rounded-xl divide-y divide-black dark:divide-white"
      {...other}
    >
      <div className="flex justify-between items-center mb-4">
        <Heading as="div" variant="h4" noMargin>
          {title}
        </Heading>
        <Text noMargin>{publishedAt}</Text>
      </div>
      <Text className="pt-4">{summary}</Text>
    </Link>
  );
}
