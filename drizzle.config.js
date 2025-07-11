import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.js',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DIRECT_URL },
	verbose: true,
	strict: true
});
