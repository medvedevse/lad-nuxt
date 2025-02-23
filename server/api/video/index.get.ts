import { eq } from 'drizzle-orm';
import { db, UserSchema, VideoSchema } from '~/server/db';

export default defineEventHandler(async e => {
	return await db
		.select()
		.from(VideoSchema)
		.leftJoin(UserSchema, eq(VideoSchema.authorId, UserSchema.id))
		.orderBy(UserSchema.id);
});
