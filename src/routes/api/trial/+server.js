import Pocketbase from 'pocketbase';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import dayjs from 'dayjs';

export async function POST({ request }) {
	try {
		const agentId = await request.text();
		const trialEnd = dayjs().add(7, 'day');
		const pb = new Pocketbase('https://wjoseph0.cloud');
		await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);
		await pb.collection('subscribers').create({ agent: agentId, expiration: trialEnd });
		pb.authStore.clear();
		return new Response('', { status: 200 });
	} catch (error) {
		return new Response(`${error}`, { status: 400 });
	}
}
