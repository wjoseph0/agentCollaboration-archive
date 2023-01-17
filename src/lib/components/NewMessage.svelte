<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { filter } from '$lib/bad-words';

	let newMessage = '';

	async function sendMessage() {
		const data = {
			text: filter.clean(newMessage),
			user: $currentUser?.id
		};
		await pb.collection('messages').create(data);
		newMessage = '';
	}
</script>

<form on:submit|preventDefault={sendMessage}>
	<input placeholder="Message" type="text" bind:value={newMessage} required />
	<button type="submit">Send</button>
</form>
