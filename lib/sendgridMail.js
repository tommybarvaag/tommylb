import sendgridMail from "@sendgrid/mail";

sendgridMail.setApiKey(process.env.NEXT_PUBLIC_TLB_SEND_GRID_SEND_MAIL_API_KEY);

export default sendgridMail;
