import { json } from '@sveltejs/kit';
import { db } from '../../../../lib/server/db';
import { users } from '../../../../lib/server/db/schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const { email, password } = await request.json();

	const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

	if (user.length === 0) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const passwordMatch = await bcrypt.compare(password, user[0].passwordHash);

	if (!passwordMatch) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const token = jwt.sign({ userId: user[0].id, role: user[0].role }, env.JWT_SECRET, { expiresIn: '1h' });

	const { passwordHash, ...userWithoutPassword } = user[0];
	return json({ token, user: userWithoutPassword });
}