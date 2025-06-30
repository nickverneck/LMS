import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { courses } from '../../../lib/server/db/schema';

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'instructor') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { title, description, price } = await request.json();

	try {
		const newCourse = await db.insert(courses).values({
			instructorId: locals.user.userId,
			title,
			description,
			price
		}).returning();
		return json(newCourse[0], { status: 201 });
	} catch (error) {
		console.error('Error creating course:', error);
		return json({ error: 'Could not create course' }, { status: 500 });
	}
}

export async function GET() {
	try {
		const allCourses = await db.select().from(courses);
		return json(allCourses);
	} catch (error) {
		console.error('Error fetching courses:', error);
		return json({ error: 'Could not fetch courses' }, { status: 500 });
	}
}