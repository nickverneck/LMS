import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/db';
import { payments, enrollments, courses, users } from '../../../lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET({ locals }) {
	if (!locals.user || locals.user.role !== 'instructor') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	try {
		const instructorPayments = await db.select({
			paymentId: payments.id,
			amount: payments.amount,
			currency: payments.currency,
			status: payments.status,
			transactionId: payments.transactionId,
			paidAt: payments.paidAt,
			courseTitle: courses.title,
			studentName: users.name,
			studentEmail: users.email
		})
			.from(payments)
			.innerJoin(enrollments, eq(payments.enrollmentId, enrollments.id))
			.innerJoin(courses, eq(enrollments.courseId, courses.id))
			.innerJoin(users, eq(enrollments.studentId, users.id))
			.where(eq(courses.instructorId, locals.user.userId));

		return json(instructorPayments);
	} catch (error) {
		console.error('Error fetching instructor payments:', error);
		return json({ error: 'Could not fetch payments' }, { status: 500 });
	}
}
