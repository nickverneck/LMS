import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { db } from '../../../lib/server/db';
import { payments, enrollments } from '../../../lib/server/db/schema';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });

export async function POST({ request }) {
	const sig = request.headers.get('stripe-signature');
	let event;

	try {
		event = stripe.webhooks.constructEvent(await request.text(), sig, env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error('Webhook Error:', err.message);
		return json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
	}

	// Handle the event
	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object;
			const { courseId, studentId } = session.metadata;
			const amount = session.amount_total / 100; // Convert cents to dollars
			const currency = session.currency;
			const transactionId = session.id;

			try {
				// Create a payment record
				const newPayment = await db.insert(payments).values({
					enrollmentId: null, // Will be updated after enrollment
					amount,
					currency,
					status: 'completed',
					transactionId,
				}).returning();

				// Create or update enrollment
				const existingEnrollment = await db.select().from(enrollments).where(and(eq(enrollments.studentId, parseInt(studentId)), eq(enrollments.courseId, parseInt(courseId)))).limit(1);

				if (existingEnrollment.length === 0) {
					const newEnrollment = await db.insert(enrollments).values({
						studentId: parseInt(studentId),
						courseId: parseInt(courseId),
					}).returning();
					await db.update(payments).set({ enrollmentId: newEnrollment[0].id }).where(eq(payments.id, newPayment[0].id));
				} else {
					await db.update(payments).set({ enrollmentId: existingEnrollment[0].id }).where(eq(payments.id, newPayment[0].id));
				}

				console.log('Payment and enrollment processed successfully!');
			} catch (dbError) {
				console.error('Database error during webhook processing:', dbError);
				return json({ error: 'Database update failed' }, { status: 500 });
			}
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return json({ received: true });
}
