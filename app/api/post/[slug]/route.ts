import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const postSlugSchema = z.object({
  slug: z.string()
});

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await postSlugSchema.parseAsync(params);

    const post = await db.select().from(posts).where(eq(posts.slug, slug)).get();

    if (post) {
      return NextResponse.json(post);
    }

    return NextResponse.json(await db.insert(posts).values({ slug }).returning().get());
  } catch (error) {
    console.error(JSON.stringify(error));
    if (error instanceof z.ZodError) {
      return NextResponse.json({ status: 422, body: error.issues });
    }

    return new Response(error, {
      status: 422
    });
  }
}
