import { createClient } from "@libsql/client";
import { AnyColumn, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
});

export const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};

export const db = drizzle(client);
