import { connect } from "@planetscale/database";

export const planetScale = connect({
  url: process.env.DATABASE_URL
});
