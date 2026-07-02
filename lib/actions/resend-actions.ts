"use server";

import { z } from "zod";

const sendContactFormSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  message: z.string().trim().min(1).max(5000),
  phone: z.string().optional()
});

type ContactFormState = {
  status: "idle" | "success" | "error";
};

// Module-private: not exported, so it is not an independently invokable action endpoint.
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
      text: `New message from ${fullName} (${email}):\n\n${message}`
    })
  });

  return response;
}

async function sendFormAction(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const form = sendContactFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    message: formData.get("message"),
    phone: formData.get("phone")
  });

  if (!form.success) {
    return { status: "error" };
  }

  // Honeypot: pretend success without sending.
  if (form.data.phone) {
    return { status: "success" };
  }

  try {
    const response = await sendConnectForm(form.data.fullName, form.data.email, form.data.message);

    return { status: response.ok ? "success" : "error" };
  } catch {
    return { status: "error" };
  }
}

export { sendFormAction };
export type { ContactFormState };
