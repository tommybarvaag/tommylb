import { Box, Grid, Heading, Text } from "theme-ui";
import Layout from "../layouts";
import { frontMatter as blogPosts } from "./blog/**/*.mdx";

export default function Blog() {
  return (
    <Layout>
      <Grid width={[128, 128, 192]}>
        {blogPosts.map(blogPost => (
          <Box>
            <Heading>{blogPost.title}</Heading>
            <Text>{blogPost.summary}</Text>
          </Box>
        ))}
      </Grid>
    </Layout>
  );
}
