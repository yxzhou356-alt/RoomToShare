CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`date` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`opinion` text DEFAULT '' NOT NULL,
	`feelings` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'private' NOT NULL,
	`context` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `entries_user_date_idx` ON `entries` (`user_id`,`date`);