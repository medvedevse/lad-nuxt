import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres('postgresql://root:root@localhost:5432/lad-nuxt');
export const db = drizzle({ client: queryClient });

export * from './schemas/user.schema';
export * from './schemas/video.schema';
