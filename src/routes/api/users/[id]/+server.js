import { json } from '@sveltejs/kit';
import { db } from '../../../../lib/server/db';
import { users } from '../../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params, locals }) {
	if (!locals.user || (locals.user.userId !== parseInt(params.id) && locals.user.role !== 'admin')) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const user = await db.select().from(users).where(eq(users.id, parseInt(params.id))).limit(1);

	if (user.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json(user[0]);
}

export async function PUT({ params, request, locals }) {
	if (!locals.user || (locals.user.userId !== parseInt(params.id) && locals.user.role !== 'admin')) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { firstName, lastName, email } = await request.json();

	try {
		await db.update(users).set({ firstName, lastName, email }).where(eq(users.id, parseInt(params.id)));
		return json({ message: 'Profile updated successfully' });
	} catch (error) {
		return json({ error: 'Could not update profile' }, { status: 500 });
	}
}
