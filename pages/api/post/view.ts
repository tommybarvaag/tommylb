import { withMethods } from "@/lib/api-middleware/with-methods";
import prisma from "@/lib/prisma";
import { postSchema } from "@/lib/validations/post/post";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      const body = JSON.parse(req.body);

      const payload = postSchema.parse(body);

      // ignore localhost requests
      if (req?.headers?.host?.includes("localhost")) {
        const post = await prisma.post.findFirst({
          where: {
            slug: payload.slug
          }
        });
        return res.status(200).json(post);
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

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["PATCH"], handler);
