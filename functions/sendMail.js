exports.handler = async function(event, context, callback) {
  const sendGridMail = require("@sendgrid/mail");

  sendGridMail.setApiKey(process.env.NEXT_APP_SEND_GRID_SEND_MAIL_API_KEY);

  sendGridMail
    .send({
      to: "tommybarvaag@gmail.com",
      from: "tommybarvaag@gmail.com",
      subject: "Test email from netlify functions",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    })
    .then(response => {
      callback(null, {
        statusCode: response.statusCode,
        body: response.message
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: error.code,
        body: error.message
      });
    });
};
