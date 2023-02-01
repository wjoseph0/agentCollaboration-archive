<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { filter } from '$lib/bad-words';
	import { onMount } from 'svelte';

	let newMessage = '';
	export let receiver;

	onMount(async () => {
		receiver = await pb
			.collection('users')
			.getFirstListItem(`email="${receiver}"`);
	});

	async function sendMessage() {
		const data = {
			text: filter.clean(newMessage),
			sender: $currentUser?.id,
			receiver: receiver.id
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
		grid-template-columns: 9fr 1fr;
	}
</style>
