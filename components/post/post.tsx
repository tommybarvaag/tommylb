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
    <Link href={href} className="mb-12 block w-full divide-y divide-white" {...other}>
      <div className="mb-4 flex items-center justify-between">
        <Heading as="div" variant="h3" noMargin>
          {title}
        </Heading>
        <Text noMargin>{publishedAt}</Text>
      </div>
      <Text className="pt-4">{summary}</Text>
    </Link>
  );
}
