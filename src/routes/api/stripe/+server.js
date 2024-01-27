import Pocketbase from 'pocketbase';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { env } from '$env/dynamic/private';
import dayjs from 'dayjs';

const pb = new Pocketbase('https://wjoseph0.cloud');
await pb.admins.authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);
const stripe = new Stripe(STRIPE_SECRET_KEY);
const endpointSecret = STRIPE_WEBHOOK_SECRET;

export async function POST({ request }) {
	const payload = await request.text();
	const sig = request.headers.get('stripe-signature');
	let event;
	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (err) {
		return new Response({}, { status: 400 });
	}
	switch (event.type) {
		case 'invoice.paid':
			const expirationDate = dayjs.unix(event.data.object.lines.data[0].period.end);
			const expirationDatePlusTwoDays = expirationDate.add(2, 'day').format();
			const customer = await stripe.customers.retrieve(event.data.object.customer);
			const user = await pb.collection('users').getFirstListItem(`email='${customer.email}'`);
			try {
				const subscriber = await pb
					.collection('subscribers')
					.getFirstListItem(`agent='${user.id}'`);
				await pb
					.collection('subscribers')
					.update(subscriber.id, { expiration: expirationDatePlusTwoDays });
			} catch (err) {
				await pb
					.collection('subscribers')
					.create({ agent: user.id, expiration: expirationDatePlusTwoDays });
			}
			break;
	}
	return new Response({}, { status: 200 });
}
