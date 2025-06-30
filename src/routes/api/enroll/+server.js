import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { enrollments, courses } from '../../../lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'student') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { courseId } = await request.json();
	const studentId = locals.user.userId;

	try {
		// Check if the course exists
		const courseExists = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
		if (courseExists.length === 0) {
			return json({ error: 'Course not found' }, { status: 404 });
		}

		// Check if the student is already enrolled
		const alreadyEnrolled = await db.select().from(enrollments).where(and(eq(enrollments.studentId, studentId), eq(enrollments.courseId, courseId))).limit(1);
		if (alreadyEnrolled.length > 0) {
			return json({ message: 'Already enrolled in this course' }, { status: 200 });
		}

		const newEnrollment = await db.insert(enrollments).values({
			studentId,
			courseId
		}).returning();

		return json(newEnrollment[0], { status: 201 });
	} catch (error) {
		console.error('Error enrolling in course:', error);
		return json({ error: 'Could not enroll in course' }, { status: 500 });
	}
}
