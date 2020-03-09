require("dotenv").config();
module.exports = {
  env: {
    SEND_GRID_SEND_MAIL_API_KEY: process.env.SEND_GRID_SEND_MAIL_API_KEY
  }
};
