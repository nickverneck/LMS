import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { users } from '../../../lib/server/db/schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const { firstName, lastName, email, password, confirmPassword, confirmEmail } = await request.json();

	// Register user
	if (password !== confirmPassword) {
		return json({ error: 'Passwords do not match' }, { status: 400 });
	}
	if (email !== confirmEmail) {
		return json({ error: 'Emails do not match' }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const [newUser] = await db.insert(users).values({ firstName, lastName, email, passwordHash: hashedPassword, role: 'student' }).returning();
		const token = jwt.sign({ userId: newUser.id, role: newUser.role }, env.JWT_SECRET, { expiresIn: '1h' });
		const { passwordHash, ...userWithoutPassword } = newUser;
		return json({ message: 'User registered successfully', token, user: userWithoutPassword }, { status: 201 });
	} catch (error) {
		return json({ error: 'User with this email already exists' }, { status: 409 });
	}
}