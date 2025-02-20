import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: ['./server/db/schemas/*.schema.ts'],
	dialect: 'postgresql',
	dbCredentials: {
		url: 'postgresql://root:root@localhost:5432/lad-nuxt',
	},
});
