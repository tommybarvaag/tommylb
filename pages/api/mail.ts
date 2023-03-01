import { connectFormSchema } from "@/lib/validations/connect-form/post";
import sendgridMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

export default async function sendMail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.send("Method not allowed.");
  }

  const apiKey = process.env.NEXT_PUBLIC_TLB_SEND_GRID_SEND_MAIL_API_KEY;
  if (!apiKey) {
    return res.status(500).end();
  }

  try {
    const payload = connectFormSchema.parse(req.body);

    if (payload.phone) {
      return res.status(202).end();
    }

    sendgridMail.setApiKey(apiKey);

    await sendgridMail.send({
      to: "tommy@barvaag.com",
      from: "post@tommylb.com",
      subject: `Contact from ${payload.name}`,
      html: `<div>
          <h3>New message from ${payload.name}</h3>
          <p>Can be contacted at: <a href="mailto:${payload.email}">${payload.email}</a>.</p>
          <p>${payload.message}</p>
        </div>`
    });

    return res.status(202).end();
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues);
    }

    return res.status(422).end();
  }
}
