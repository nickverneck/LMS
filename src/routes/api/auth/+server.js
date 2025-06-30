import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { users } from '../../../lib/server/db/schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const { firstName, lastName, email, password, confirmPassword, confirmEmail } = await request.json();

	// Register user
	if (request.url.endsWith('/api/auth/register')) {
		if (password !== confirmPassword) {
			return json({ error: 'Passwords do not match' }, { status: 400 });
		}
		if (email !== confirmEmail) {
			return json({ error: 'Emails do not match' }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		try {
			await db.insert(users).values({ firstName, lastName, email, passwordHash: hashedPassword, role: 'student' });
			return json({ message: 'User registered successfully' }, { status: 201 });
		} catch (error) {
			return json({ error: 'User with this email already exists' }, { status: 409 });
		}
	}

	// Login user
	if (request.url.endsWith('/api/auth/login')) {
		const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (user.length === 0) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const passwordMatch = await bcrypt.compare(password, user[0].passwordHash);

		if (!passwordMatch) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const token = jwt.sign({ userId: user[0].id, role: user[0].role }, env.JWT_SECRET, { expiresIn: '1h' });

		return json({ token });
	}

	return json({ error: 'Not Found' }, { status: 404 });
}
