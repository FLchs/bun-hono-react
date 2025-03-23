CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`description` text,
	`status` text,
	`created_at` integer DEFAULT (current_timestamp),
	`updated_at` integer DEFAULT (current_timestamp) NOT NULL
);
