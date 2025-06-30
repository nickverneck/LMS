import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { courses, enrollments } from '../../../lib/server/db/schema';
import { eq, count } from 'drizzle-orm';

export async function GET({ locals }) {
	if (!locals.user || locals.user.role !== 'instructor') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	try {
		const instructorCourses = await db.select({
			id: courses.id,
			title: courses.title,
			enrollmentCount: count(enrollments.id)
		})
			.from(courses)
			.leftJoin(enrollments, eq(courses.id, enrollments.courseId))
			.where(eq(courses.instructorId, locals.user.userId))
			.groupBy(courses.id, courses.title);

		return json(instructorCourses);
	} catch (error) {
		console.error('Error fetching instructor analytics:', error);
		return json({ error: 'Could not fetch analytics data' }, { status: 500 });
	}
}
