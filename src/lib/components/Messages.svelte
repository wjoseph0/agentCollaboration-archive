<script>
	import { onMount, onDestroy } from 'svelte';
	import { pb } from '$lib/pocketbase';

	let messages = [];
	export let receiver;

	let filter = `sender.email = "${receiver}" || receiver.email = "${receiver}"`;

	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'sender',
			filter: filter
		});
		messages = resultList.items;

		// Subscribe to realtime messages
		await pb
			.collection('messages')
			.subscribe('*', async ({ action, record }) => {
				if (action === 'create') {
					// Fetch associated user
					const sender = await pb.collection('users').getOne(record.sender);
					record.expand = { sender };
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
			src={`https://avatars.dicebear.com/api/identicon/${message.expand.sender.id}.svg`}
			alt="avatar"
			width="40px"
		/>
		<small>
			{message.expand.sender.fname}
			{message.expand.sender.lname}
		</small>

		<p class="msg-text">{message.text}</p>
	</div>
{/each}
