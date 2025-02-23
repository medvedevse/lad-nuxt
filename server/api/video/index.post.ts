import { IUser } from '~/middleware/admin';
import { db, VideoSchema } from '~/server/db';

interface IFile {
	name: string;
	content: string;
	size: string;
	type: string;
	lastModified: string;
}

interface IAddVideo {
	video: IFile;
	preview: IFile;
	title: string;
	description: string;
}

export default defineEventHandler(async e => {
	const { video, preview, title, description } = await readBody<IAddVideo>(e);

	const { user } = await getUserSession(e);

	const videoFileName = await storeFileLocally(video, 10, '/video');
	const previewFileName = await storeFileLocally(preview, 10, '/preview');

	const newVideo = await db
		.insert(VideoSchema)
		.values({
			title,
			description,
			videoFileName,
			previewFileName,
			authorId: (user as IUser).id,
		})
		.returning();

	return newVideo;
});
