CREATE TABLE `notification_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL,
	`value` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`slug` text PRIMARY KEY NOT NULL,
	`views` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `strava_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`strava_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`start_date` text NOT NULL,
	`start_date_local` text NOT NULL,
	`distance` text NOT NULL,
	`moving_time` integer NOT NULL,
	`location_country` text,
	`distance_in_kilometers` real NOT NULL,
	`formatted_moving_time` text NOT NULL,
	`kilometers_per_hour` real NOT NULL,
	`minutes_per_kilometer` real NOT NULL,
	`total_elevation_Gain` real NOT NULL,
	`kudos_count` integer DEFAULT 0 NOT NULL,
	`average_speed` real NOT NULL,
	`max_speed` real NOT NULL,
	`has_heart_rate` integer DEFAULT false NOT NULL,
	`average_heart_rate` integer,
	`max_heart_rate` integer,
	`suffer_score` integer,
	`calories` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`strava_gear_id` integer,
	FOREIGN KEY (`strava_gear_id`) REFERENCES `strava_gear`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `strava_gear` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`strava_gear_id` text NOT NULL,
	`primary` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`resource_state` text NOT NULL,
	`retired` integer DEFAULT false NOT NULL,
	`distance` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `strava_personal_best` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`distance` real NOT NULL,
	`distance_in_kilometers` real NOT NULL,
	`moving_time` integer NOT NULL,
	`formatted_moving_time` text NOT NULL,
	`strava_activity_id` integer NOT NULL,
	FOREIGN KEY (`strava_activity_id`) REFERENCES `strava_activity`(`id`) ON UPDATE no action ON DELETE cascade
);
