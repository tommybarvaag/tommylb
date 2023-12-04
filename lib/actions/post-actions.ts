"use server";
import { unstable_noStore as noStore } from "next/cache";

import prisma from "@/lib/prisma";
import { headers as getHeaders } from "next/headers";
import { cache } from "react";

async function getPost(slug: string) {
  noStore();

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

  return post;
}

async function increment(slug: string) {
  noStore();

  const headers = getHeaders();

  // ignore localhost requests
  if (headers?.get("host")?.includes("localhost")) {
    return getPost(slug);
  }

  const post = await prisma.post.upsert({
    where: {
      slug: slug
    },
    create: {
      slug: slug
    },
    update: {
      views: {
        increment: 1
      }
    }
  });

  return post;
}

const incrementPostViews = cache(increment);

export { getPost, incrementPostViews };
