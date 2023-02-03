<script>
	import { onMount, onDestroy } from 'svelte';
	import { pb } from '$lib/pocketbase';

	let messages = [];
	export let recipient;
	let filter = `(user = "${recipient.id}") || (recipient = "${recipient.id}") `;

	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user',
			filter: filter
		});
		messages = resultList.items;

		// Subscribe to realtime messages
		await pb
			.collection('messages')
			.subscribe('*', async ({ action, record }) => {
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
</script>

{#each messages as message (message.id)}
	<div>
		<img
			class="avatar"
			src={`https://avatars.dicebear.com/api/identicon/${message.expand.user.id}.svg`}
			alt="avatar"
			width="40px"
		/>
		<small>
			{message.expand.user.fname}
			{message.expand.user.lname}
		</small>

		<p class="msg-text">{message.text}</p>
	</div>
{/each}
