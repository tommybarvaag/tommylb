import { withMethods } from "@/lib/api-middleware/with-methods";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const postSlug = req.query.slug as string;

      if (!postSlug) {
        return res.status(400).end();
      }

      let post = await prisma.post.findUnique({
        where: {
          slug: postSlug
        }
      });

      if (!post) {
        post = await prisma.post.create({
          data: {
            slug: postSlug
          }
        });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  }
}

export default withMethods(["GET"], handler);
