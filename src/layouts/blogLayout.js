import * as React from "react";
import { Flex, Text, useColorMode } from "theme-ui";
import useBlogPost from "../components/blog/hooks/useBlogPost";
import Footer from "../components/footer";
import GlobalStyles from "../components/globalStyles";
import Main from "../components/main";
import Nav from "../components/nav";
import PageHeading from "../components/pageHeading";
import Seo from "../components/seo";

export default function BlogLayout({ children, frontMatter, ...other }) {
  const { __resourcePath: id } = frontMatter;
  const { blogPost } = useBlogPost(id);

  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <GlobalStyles />
      <Seo />
      <Nav />
      <Main>
        <PageHeading>{blogPost.title}</PageHeading>
        <Flex sx={{ justifyContent: "space-between", mb: 4 }}>
          <Text variant="small">Tommy Lunde Barvåg / {blogPost.publishedAtDateFormatted}</Text>
          <Text variant="small">{blogPost.readingTime.text}</Text>
        </Flex>
        {children}
      </Main>
      <Footer />
    </>
  );
}
