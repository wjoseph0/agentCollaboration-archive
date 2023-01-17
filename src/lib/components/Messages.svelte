<script>
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { filter } from '$lib/bad-words';

	let newMessage = '';
	let messages = [];

	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});
		messages = resultList.items;

		// Subscribe to realtime messages
		await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				// Fetch associated user
				const user = await pb.collection('users').getOne(record.user);
				record.expand = { user };
				messages = [...messages, record];
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		});
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		pb.collection('messages').unsubscribe();
	});

	async function sendMessage() {
		const data = {
			text: filter.clean(newMessage),
			user: $currentUser?.id
		};
		await pb.collection('messages').create(data);
		newMessage = '';
	}
</script>

{#each messages as message (message.id)}
	<img
		class="avatar"
		src={`https://avatars.dicebear.com/api/identicon/${message.expand.user.username}.svg`}
		alt="avatar"
		width="40px"
	/>
	<small>
		{message.expand.user.fname}
		{message.expand.user.lname}
	</small>

	<p class="msg-text">{message.text}</p>
{/each}

<form on:submit|preventDefault={sendMessage}>
	<input placeholder="Message" type="text" bind:value={newMessage} required />
	<button type="submit">Send</button>
</form>
