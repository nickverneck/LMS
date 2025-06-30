import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { completedLessons, lessons, enrollments } from '../../../lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'student') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { lessonId } = await request.json();
	const studentId = locals.user.userId;

	try {
		// Check if the lesson exists
		const lessonExists = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
		if (lessonExists.length === 0) {
			return json({ error: 'Lesson not found' }, { status: 404 });
		}

		// Check if the student is enrolled in the course that contains this lesson
		const isEnrolled = await db.select()
			.from(enrollments)
			.innerJoin(courses, eq(enrollments.courseId, courses.id))
			.innerJoin(modules, eq(courses.id, modules.courseId))
			.innerJoin(lessons, eq(modules.id, lessons.moduleId))
			.where(and(eq(enrollments.studentId, studentId), eq(lessons.id, lessonId)))
			.limit(1);

		if (isEnrolled.length === 0) {
			return json({ error: 'Student not enrolled in this course' }, { status: 403 });
		}

		// Check if the lesson is already marked as complete for this student
		const alreadyCompleted = await db.select().from(completedLessons).where(and(eq(completedLessons.studentId, studentId), eq(completedLessons.lessonId, lessonId))).limit(1);
		if (alreadyCompleted.length > 0) {
			return json({ message: 'Lesson already marked as complete' }, { status: 200 });
		}

		// Mark lesson as complete
		await db.insert(completedLessons).values({ studentId, lessonId });

		// TODO: Update overall course progress in the enrollments table

		return json({ message: 'Lesson marked as complete' }, { status: 201 });
	} catch (error) {
		console.error('Error marking lesson as complete:', error);
		return json({ error: 'Could not mark lesson as complete' }, { status: 500 });
	}
}
