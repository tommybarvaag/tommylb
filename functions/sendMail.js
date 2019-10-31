const sendgridMail = require("@sendgrid/mail");

export async function handler(event, context) {
  const apiKey = process.env.NEXT_APP_SEND_GRID_SEND_MAIL_API_KEY;

  if (!apiKey) {
    return { statusCode: 500, body: "Missing SendGrid API key" };
  }

  try {
    const body = JSON.parse(event.body);

    if (!body || !body.email || !body.name || !body.text) {
      return {
        statusCode: 400,
        body: "Bad request"
      };
    }

    sendgridMail.setApiKey(process.env.NEXT_APP_SEND_GRID_SEND_MAIL_API_KEY);

    await sendgridMail.send({
      to: "tommy@barvaag.com",
      from: "post@tommylb.com",
      subject: `Contact from ${body.name}`,
      html: `<div>
          <h3>New message from ${body.name}</h3>
          <p>Can be contacted at: <a href="mailto:${body.email}">${body.email}</a>.</p>
          <p>${body.text}</p>
        </div>`
    });

    return {
      statusCode: 202,
      body: "Accepted"
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error"
    };
  }
}
