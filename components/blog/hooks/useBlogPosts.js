import * as React from "react";
import useSwr from "swr";
import { getFormattedBlogDate, parseDate } from "../../../utils/dateUtils";

export default function useBlogPosts(props) {
  const { data } = useSwr("/api/blog", {
    initialData: props?.initialData ?? [],
    revalidateOnMount: true
  });

  const allBlogPosts = React.useMemo(
    () =>
      data
        .filter(blogPost => blogPost.published)
        .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
        .map(blogPost => {
          const publishedAtDate = parseDate(blogPost.publishedAt, "yyyy-mm-dd");
          return {
            ...blogPost,
            publishedAtDate,
            publishedAtDateFormatted: getFormattedBlogDate(publishedAtDate)
          };
        }),
    [data]
  );

  const blogPosts = React.useMemo(() => allBlogPosts.filter(blogPost => !blogPost.unlisted), [
    allBlogPosts
  ]);

  const featuredBlogPosts = React.useMemo(() => blogPosts.filter(blogPost => blogPost.featured), [
    blogPosts
  ]);

  return { blogPosts, featuredBlogPosts };
}
