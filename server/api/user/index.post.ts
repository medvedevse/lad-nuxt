import { genSalt, hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db, UserSchema, UserSchemaInsert } from '~/server/db';

interface ICreateUser {
	username: string;
	password: string;
	isAdmin?: boolean;
}

export default defineEventHandler(async e => {
	const body: ICreateUser = await readBody(e);

	const salt = await genSalt(10);
	const genPasswordHash = await hash(body.password, salt);

	const candidate = {
		username: body.username,
		passwordHash: genPasswordHash,
		isAdmin: body.isAdmin,
	};

	const findUser = (
		await db
			.select()
			.from(UserSchema)
			.where(eq(UserSchema.username, candidate.username))
			.limit(1)
			.execute()
	)[0];

	if (findUser) {
		return createError({
			statusCode: 401,
			message: 'User already has been created',
		});
	}

	const user = await db.insert(UserSchema).values({ ...candidate });
	const { passwordHash, ...result } = user as UserSchemaInsert;
	return result;
});
