import * as React from "react";
import type { FrontMatterData } from "types";
import Footer from "../components/footer";
import Heading from "../components/heading";
import Main from "../components/main";
import Nav from "../components/nav";
import Seo from "../components/seo";
import Text from "../components/text";
import { getFormattedPostDate, parseDate } from "../utils/dateUtils";

type PostLayoutProps = {
  children: React.ReactNode;
  frontMatter: FrontMatterData;
};

export default function PostLayout({ children, frontMatter, ...other }: PostLayoutProps) {
  const { title, publishedAt, readingTime } = frontMatter;

  const publishedAtDateFormatted = React.useMemo(
    () => getFormattedPostDate(parseDate(publishedAt, "yyyy-mm-dd")),
    [publishedAt]
  );

  return (
    <>
      <Seo />
      <Nav />
      <Main {...other}>
        <Heading as="pageHeading">{title}</Heading>
        <div className="flex justify-between mb-4">
          <Text>Tommy Lunde Barvåg / {publishedAtDateFormatted}</Text>
          <Text className="ml-2">- {readingTime.text}</Text>
        </div>
        {children}
      </Main>
      <Footer />
    </>
  );
}
