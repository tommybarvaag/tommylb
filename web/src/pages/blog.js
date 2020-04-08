import { Container, Typography } from "@material-ui/core";
import Footer from "../components/footer";
import Link from "../components/link";
import Nav from "../components/nav";
import { getAllPostsWithSlug } from "../lib/sanity/api";

export default function Blog({ posts }) {
  return (
    <>
      <Nav />
      <Container component="main">
        {posts?.length > 0 &&
          posts.map(post => (
            <Link key={post.slug} href={`blog/${post.slug}`} underline="none">
              <Typography variant="body2" color="textSecondary" align="center">
                {post.slug}
              </Typography>
            </Link>
          ))}
        <Footer />
      </Container>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const posts = await getAllPostsWithSlug();

  return {
    props: {
      preview,
      posts
    }
  };
}
