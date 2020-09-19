import { Card, Flex, Heading, Text } from "theme-ui";
import Link from "../link";

export default function BlogPost({ title, summary, href, publishedAt, ...other }) {
  return (
    <Link
      as={Card}
      variant="no-underline"
      href={href}
      sx={{
        display: "block",
        mb: 3
      }}
      {...other}
    >
      <Flex sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Heading as="h2" variant="no-margin">
          {title}
        </Heading>
        <Heading as="h5" variant="no-margin" color="muted" sx={{ fontWeight: "body" }}>
          {publishedAt}
        </Heading>
      </Flex>
      <Text>{summary}</Text>
    </Link>
  );
}
