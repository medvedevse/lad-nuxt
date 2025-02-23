import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { UserSchema } from './user.schema';

export const VideoSchema = pgTable('video', {
	id: serial('id').primaryKey(),
	title: varchar('title'),
	description: varchar('description'),
	previewFileName: varchar('preview_name'),
	videoFileName: varchar('video_name'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	authorId: integer('author_id'),
});

export const videoRelations = relations(VideoSchema, ({ one }) => ({
	author: one(UserSchema, {
		fields: [VideoSchema.authorId],
		references: [UserSchema.id],
	}),
}));

export type VideoSchemaSelect = typeof VideoSchema.$inferSelect;
export type VideoSchemaInsert = typeof VideoSchema.$inferInsert;
