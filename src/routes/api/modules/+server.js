import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { modules, courses } from '../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'instructor') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { courseId, title, order } = await request.json();

	// Verify that the course belongs to the instructor
	const courseExists = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
	if (courseExists.length === 0 || courseExists[0].instructorId !== locals.user.userId) {
		return json({ error: 'Course not found or you do not have permission to add modules to this course' }, { status: 403 });
	}

	try {
		const newModule = await db.insert(modules).values({
			courseId,
			title,
			order
		}).returning();
		return json(newModule[0], { status: 201 });
	} catch (error) {
		console.error('Error creating module:', error);
		return json({ error: 'Could not create module' }, { status: 500 });
	}
}
