import { json } from '@sveltejs/kit';
import { db } from '../../../../lib/server/db';
import { lessons, modules } from '../../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'instructor') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { moduleId, title, contentType, contentUrl, content, duration, order } = await request.json();

	// Verify that the module belongs to an instructor's course
	const moduleExists = await db.select().from(modules).where(eq(modules.id, moduleId)).limit(1);
	if (moduleExists.length === 0) {
		return json({ error: 'Module not found' }, { status: 404 });
	}

	// TODO: Add a check to ensure the module belongs to a course created by the current instructor

	try {
		const newLesson = await db.insert(lessons).values({
			moduleId,
			title,
			contentType,
			contentUrl,
			content,
			duration,
			order
		}).returning();
		return json(newLesson[0], { status: 201 });
	} catch (error) {
		console.error('Error creating lesson:', error);
		return json({ error: 'Could not create lesson' }, { status: 500 });
	}
}
