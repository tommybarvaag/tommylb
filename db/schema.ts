import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export const stravaActivity = sqliteTable("strava_activity", {
  id: integer("id").primaryKey({
    autoIncrement: true
  }),
  stravaId: text("strava_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  startDate: text("start_date").notNull(),
  startDateLocal: text("start_date_local").notNull(),
  distance: real("distance").notNull(),
  movingTime: integer("moving_time").notNull(),
  locationCountry: text("location_country"),
  distanceInKilometers: real("distance_in_kilometers").notNull(),
  formattedMovingTime: text("formatted_moving_time").notNull(),
  kilometersPerHour: real("kilometers_per_hour").notNull(),
  minutesPerKilometer: real("minutes_per_kilometer").notNull(),
  totalElevationGain: real("total_elevation_Gain").notNull(),
  kudosCount: integer("kudos_count").notNull().default(0),
  averageSpeed: real("average_speed").notNull(),
  maxSpeed: real("max_speed").notNull(),
  hasHeartRate: integer("has_heart_rate", {
    mode: "boolean"
  })
    .notNull()
    .default(false),
  averageHeartRate: integer("average_heart_rate"),
  maxHeartRate: integer("max_heart_rate"),
  sufferScore: integer("suffer_score"),
  calories: integer("calories").notNull().default(0),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  stravaGearId: integer("strava_gear_id").references(() => stravaGear.id, {
    onDelete: "set null"
  })
});

export const stravaGear = sqliteTable("strava_gear", {
  id: integer("id").primaryKey({
    autoIncrement: true
  }),
  stravaGearId: text("strava_gear_id").notNull(),
  primary: integer("primary", {
    mode: "boolean"
  })
    .notNull()
    .default(false),
  name: text("name").notNull(),
  resourceState: text("resource_state").notNull(),
  retired: integer("retired", {
    mode: "boolean"
  })
    .notNull()
    .default(false),
  distance: real("distance").notNull()
});

export const stravaPersonalBest = sqliteTable("strava_personal_best", {
  id: integer("id").primaryKey({
    autoIncrement: true
  }),
  name: text("name").notNull(),
  distance: real("distance").notNull(),
  distanceInKilometers: real("distance_in_kilometers").notNull(),
  movingTime: integer("moving_time").notNull(),
  formattedMovingTime: text("formatted_moving_time").notNull(),
  stravaActivityId: integer("strava_activity_id")
    .notNull()
    .references(() => stravaActivity.id, { onDelete: "cascade" })
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export type InsertNotificationLog = typeof notificationLogs.$inferInsert;
export type SelectNotificationLog = typeof notificationLogs.$inferSelect;

export type InsertStravaActivity = typeof stravaActivity.$inferInsert;
export type SelectStravaActivity = typeof stravaActivity.$inferSelect;

export type InsertStravaGear = typeof stravaGear.$inferInsert;
export type SelectStravaGear = typeof stravaGear.$inferSelect;

export type InsertStravaPersonalBest = typeof stravaPersonalBest.$inferInsert;
export type SelectStravaPersonalBest = typeof stravaPersonalBest.$inferSelect;
