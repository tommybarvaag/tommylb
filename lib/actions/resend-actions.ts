"use server";

import { z } from "zod";

const SendContactFormSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  message: z.string(),
  phone: z.string().optional()
});

async function sendConnectForm(fullName: string, email: string, message: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_EMAIL_SENDING_API_KEY}`
    },
    body: JSON.stringify({
      to: process.env.RESEND_EMAIL_RECIPIENT,
      from: "tommylb+com@barvaag.com",
      subject: `tommylb.com contact from: ${fullName}`,
      html: `<div>
            <h3>New message from ${fullName}</h3>
            <p>Can be contacted at: <a href="mailto:${email}">${email}</a>.</p>
            <p>${message}</p>
          </div>`
    })
  });

  return response;
}

async function sendFormAction(prevState: any, formData: FormData): Promise<boolean> {
  const form = SendContactFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    message: formData.get("message"),
    phone: formData.get("phone")
  });

  if (!form.success) {
    return false;
  }

  if (form.data.phone) {
    return false;
  }

  const response = await sendConnectForm(form.data.fullName, form.data.email, form.data.message);

  return response.ok;
}

export { sendConnectForm, sendFormAction };
