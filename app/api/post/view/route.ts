import prisma from "@/lib/prisma";
import { postSchema } from "@/lib/validations/post/post";
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
      const post = await prisma.post.findFirst({
        where: {
          slug: payload.slug
        }
      });
      return NextResponse.json(post);
    }

    const post = await prisma.post.upsert({
      where: {
        slug: payload.slug
      },
      create: {
        slug: payload.slug
      },
      update: {
        views: {
          increment: 1
        }
      }
    });

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
