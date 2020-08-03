import sanityImage from "@sanity/image-url";
import client, { previewClient } from "./sanityClient";

const getUniquePosts = posts => {
  const slugs = new Set();
  return posts.filter(post => {
    if (slugs.has(post.slug)) {
      return false;
    } else {
      slugs.add(post.slug);
      return true;
    }
  });
};

const postFields = `
  name,
  title,
  publishedAt,
  excerpt,
  'slug': slug.current,
  'mainImage': mainImage,
  'author': author -> {name, 'picture': picture.asset->url}
`;

const getClient = preview => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export const getSocialMediaImageUrl = asset => {
  const image = imageBuilder.image(asset);

  return image.width(1200).height(630).quality(90).fit("max").format("png").url();
};

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
  return data;
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc, _updatedAt desc){
      ${postFields}
    }`);
  return getUniquePosts(results);
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
      }`,
        { slug }
      )
      .then(res => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
      }[0...2]`,
      { slug }
    )
  ]);
  return { post, morePosts: getUniquePosts(morePosts) };
}
