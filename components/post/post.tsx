import { Heading } from "@/components/heading";
import Link from "@/components/link";
import Text from "@/components/text";

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
        <Heading variant="h1">{title}</Heading>
        <Text>{publishedAt}</Text>
      </div>
      <Text className="pt-4">{summary}</Text>
    </Link>
  );
}
