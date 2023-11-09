import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const postSlugSchema = z.object({
  slug: z.string()
});

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await postSlugSchema.parseAsync(params);

    let post = await prisma.post.findUnique({
      where: {
        slug: slug
      }
    });

    if (!post) {
      post = await prisma.post.create({
        data: {
          slug: slug
        }
      });
    }

    return NextResponse.json(post);
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
