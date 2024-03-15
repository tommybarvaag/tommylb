import { db, increment } from "@/db/db";
import { posts } from "@/db/schema";
import { postSchema } from "@/lib/validations/post/post";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PATCH(request: NextRequest) {
  try {
    const res = await request.json();

    const payload = postSchema.parse(res);

    const headersList = headers();

    // ignore localhost requests
    if (headersList?.get("host")?.includes("localhost")) {
      const post = await db.select().from(posts).where(eq(posts.slug, payload.slug)).get();

      if (post) {
        return NextResponse.json(post);
      }

      return NextResponse.json(
        await db.insert(posts).values({ slug: payload.slug }).returning().get()
      );
    }

    const post = await db
      .update(posts)
      .set({ views: increment(posts.views, 1) })
      .where(eq(posts.slug, payload.slug))
      .returning()
      .get();

    return NextResponse.json(post);
  } catch (error) {
    console.error(JSON.stringify(error));
    if (error instanceof z.ZodError) {
      return NextResponse.json({ status: 422, body: error.issues });
    }

    return new NextResponse(error, {
      status: 422
    });
  }
}
