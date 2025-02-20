import { compare, genSalt, hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db, UserSchema } from '~/server/db';

interface IAuthData {
	username: string;
	password: string;
}

export default defineEventHandler(async e => {
	const body: IAuthData = await readBody(e);

	const findUser = (
		await db
			.select()
			.from(UserSchema)
			.where(eq(UserSchema.username, body.username))
			.limit(1)
			.execute()
	)[0];

	if (!findUser) {
		return createError({
			statusCode: 401,
			message: 'Wrong username or password1',
		});
	}

	const comparePasswords =
		findUser.passwordHash &&
		(await compare(body.password, findUser.passwordHash));

	if (!comparePasswords) {
		return createError({
			statusCode: 401,
			message: 'Wrong username or password2',
		});
	}

	const { passwordHash, ...result } = findUser;

	const session = await setUserSession(e, {
		user: { ...result },
		createdAt: Date.now(),
	});
	return session;
});
