import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { db } from '../../../lib/server/db';
import { courses } from '../../../lib/server/db/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'student') {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { courseId } = await request.json();

	try {
		const course = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);

		if (course.length === 0) {
			return json({ error: 'Course not found' }, { status: 404 });
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: course[0].title,
						},
						unit_amount: Math.round(course[0].price * 100), // Price in cents
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: `${request.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${request.headers.get('origin')}/payment-cancel`,
			metadata: { courseId: course[0].id, studentId: locals.user.userId },
		});

		return json({ id: session.id });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		return json({ error: 'Could not create checkout session' }, { status: 500 });
	}
}
