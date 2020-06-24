import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { Container } from "../../components/container";
import Image from "../../components/image";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/sanity/api";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <div>{post?.title}</div>
      <Image alt={post?.mainImage?.alt} url={post?.mainImage?.asset} />
    </Container>
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
