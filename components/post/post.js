import Heading from "../heading";
import Link from "../link";
import Text from "../text";

export default function Post({ title, summary, href, publishedAt, ...other }) {
  return (
    <Link
      href={href}
      className="block w-full !p-6 mb-12 border border-black dark:border-white rounded-xl divide-y divide-black dark:divide-white"
      {...other}
    >
      <div className="flex justify-between items-center mb-4">
        <Heading as="div" variant="h4" className="mb-0">
          {title}
        </Heading>
        <Text>{publishedAt}</Text>
      </div>
      <Text className="pt-4">{summary}</Text>
    </Link>
  );
}
