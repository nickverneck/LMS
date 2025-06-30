import { json } from '@sveltejs/kit';
import { db } from '../../../../lib/server/db';
import { liveSessions } from '../../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params, locals }) {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const liveSession = await db.select().from(liveSessions).where(eq(liveSessions.id, parseInt(params.id))).limit(1);

		if (liveSession.length === 0) {
			return json({ error: 'Live session not found' }, { status: 404 });
		}

		// TODO: Add logic to ensure only enrolled students or the instructor can view the session details

		return json(liveSession[0]);
	} catch (error) {
		console.error('Error fetching live session:', error);
		return json({ error: 'Could not fetch live session' }, { status: 500 });
	}
}
