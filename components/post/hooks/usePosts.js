import * as React from "react";
import useSwr from "swr";
import { getFormattedPostDate, parseDate } from "../../../utils/dateUtils";

export default function usePosts(props) {
  const { data } = useSwr("/api/post", {
    initialData: props?.initialData ?? [],
    revalidateOnMount: true
  });

  const allPosts = React.useMemo(
    () =>
      data
        .filter(post => post.published)
        .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
        .map(post => {
          const publishedAtDate = parseDate(post.publishedAt, "yyyy-mm-dd");
          return {
            ...post,
            publishedAtDate,
            publishedAtDateFormatted: getFormattedPostDate(publishedAtDate)
          };
        }),
    [data]
  );

  const posts = React.useMemo(() => allPosts.filter(post => !post.unlisted), [allPosts]);

  const featuredPosts = React.useMemo(() => posts.filter(post => post.featured), [posts]);

  return { posts, featuredPosts };
}
