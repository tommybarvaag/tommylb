import { unstable_noStore as noStore } from "next/cache";

import { db, increment } from "@/db/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers as getHeaders } from "next/headers";
import { cache } from "react";

async function getPost(slug: string) {
  noStore();

  const post = await db.select().from(posts).where(eq(posts.slug, slug)).get();

  if (post) {
    return post;
  }

  return await db.insert(posts).values({ slug }).returning().get();
}

const incrementPostViews = cache(async (slug: string) => {
  noStore();

  const headers = getHeaders();

  // ignore localhost requests
  if (headers?.get("host")?.includes("localhost")) {
    return getPost(slug);
  }

  const post = await db
    .update(posts)
    .set({ views: increment(posts.views, 1) })
    .where(eq(posts.slug, slug))
    .returning()
    .get();

  return post;
});

export { getPost, incrementPostViews };
