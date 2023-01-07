import { connect } from "@planetscale/database";

// use next.js fetch
export const planetScale = connect({
  fetch,
  url: process.env.DATABASE_URL
});
