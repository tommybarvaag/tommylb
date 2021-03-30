import * as React from "react";
import Footer from "../components/footer";
import Heading from "../components/heading";
import Main from "../components/main";
import Nav from "../components/nav";
import Seo from "../components/seo";
import Text from "../components/text";
import { getFormattedPostDate, parseDate } from "../utils/dateUtils";

export default function PostLayout({ children, frontMatter, ...other }) {
  const { title, publishedAt, readingTime } = frontMatter;

  const publishedAtDateFormatted = React.useMemo(() =>
    getFormattedPostDate(parseDate(publishedAt, "yyyy-mm-dd"))
  );

  return (
    <>
      <Seo />
      <Nav />
      <Main>
        <Heading as="pageHeading">{title}</Heading>
        <div className="flex justify-between mb-4">
          <Text>Tommy Lunde Barvåg / {publishedAtDateFormatted}</Text>
          <Text>{readingTime.text}</Text>
        </div>
        {children}
      </Main>
      <Footer />
    </>
  );
}
