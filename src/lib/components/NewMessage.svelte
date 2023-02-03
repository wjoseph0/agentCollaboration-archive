<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { filter } from '$lib/bad-words';

	let newMessage = '';
	export let recipient;

	async function sendMessage() {
		const data = {
			text: filter.clean(newMessage),
			user: $currentUser?.id,
			recipient: recipient?.id
		};
		await pb.collection('messages').create(data);
		newMessage = '';
	}
</script>

<form on:submit|preventDefault={sendMessage}>
	<input placeholder="Message" type="text" bind:value={newMessage} required />
	<button type="submit">Send</button>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 8fr 1fr;
	}
</style>
