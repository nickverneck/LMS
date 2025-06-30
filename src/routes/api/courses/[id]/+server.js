import { json } from '@sveltejs/kit';
import { db } from '../../../../lib/server/db';
import { courses } from '../../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
	try {
		const course = await db.select().from(courses).where(eq(courses.id, parseInt(params.id))).limit(1);

		if (course.length === 0) {
			return json({ error: 'Course not found' }, { status: 404 });
		}

		return json(course[0]);
	} catch (error) {
		console.error('Error fetching course:', error);
		return json({ error: 'Could not fetch course' }, { status: 500 });
	}
}
