require("dotenv").config();

module.exports = {
  env: {
    TLB_SANITY_PROJECT_ID: process.env.TLB_SANITY_PROJECT_ID,
    TLB_SEND_GRID_SEND_MAIL_API_KEY: process.env.TLB_SEND_GRID_SEND_MAIL_API_KEY
  }
};
