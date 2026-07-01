import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notificationLogs = sqliteTable("notification_logs", {
  id: integer("id").primaryKey({
    autoIncrement: true
  }),
  type: text("message").notNull(),
  value: text("value").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const posts = sqliteTable("posts", {
  slug: text("slug").primaryKey(),
  views: integer("views").notNull().default(1)
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export type InsertNotificationLog = typeof notificationLogs.$inferInsert;
export type SelectNotificationLog = typeof notificationLogs.$inferSelect;
