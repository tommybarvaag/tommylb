"use server";

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

async function sendFormAction(prevState: any, formData: FormData) {
  const response = await sendConnectForm(
    formData.get("fullName") as string,
    formData.get("email") as string,
    formData.get("message") as string
  );

  return response.ok;
}

export { sendConnectForm, sendFormAction };
