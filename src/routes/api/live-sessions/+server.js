import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { liveSessions, courses } from '../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'instructor') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { courseId, title, scheduledAt, duration, meetingLink, roomId } = await request.json();

	// Verify that the course belongs to the instructor
	const courseExists = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
	if (courseExists.length === 0 || courseExists[0].instructorId !== locals.user.userId) {
		return json({ error: 'Course not found or you do not have permission to schedule live sessions for this course' }, { status: 403 });
	}

	try {
		const newLiveSession = await db.insert(liveSessions).values({
			courseId,
			instructorId: locals.user.userId,
			title,
			scheduledAt: new Date(scheduledAt),
			duration,
			meetingLink,
			roomId
		}).returning();
		return json(newLiveSession[0], { status: 201 });
	} catch (error) {
		console.error('Error creating live session:', error);
		return json({ error: 'Could not create live session' }, { status: 500 });
	}
}
