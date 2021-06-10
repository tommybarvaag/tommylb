const sendgridMail = require("@sendgrid/mail");

export default async function sendMail(req, res) {
  if (req.method !== "POST") {
    return res.send("Method not allowed.");
  }

  const apiKey = process.env.NEXT_PUBLIC_TLB_SEND_GRID_SEND_MAIL_API_KEY;
  if (!apiKey) {
    return res.status(500).end();
  }

  try {
    if (!req.body || req.body === "" || !req.body.email || !req.body.name) {
      return res.status(400).end();
    }

    sendgridMail.setApiKey(apiKey);

    await sendgridMail.send({
      to: "tommy@barvaag.com",
      from: "post@tommylb.com",
      subject: `Contact from ${req.body.name}`,
      html: `<div>
          <h3>New message from ${req.body.name}</h3>
          <p>Can be contacted at: <a href="mailto:${req.body.email}">${req.body.email}</a>.</p>
          <p>${req.body.message}</p>
        </div>`
    });

    return res.status(202).end();
  } catch (err) {
    return res.status(500).end();
  }
}
