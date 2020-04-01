import { Container } from "@material-ui/core";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/sanity/apiBlogPost";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Nav />
      <Container component="main">
        <div>{post?.title}</div>
        <Footer />
      </Container>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post: data.post || null,
      morePosts: data.morePosts || null
    }
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths:
      allPosts?.map(post => ({
        params: {
          slug: post.slug
        }
      })) || [],
    fallback: true
  };
}
