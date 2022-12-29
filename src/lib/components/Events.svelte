<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from '../pocketbase';
	import { filter } from '../bad-words';

	let newTitle: string;
	let newDate: any;
	let events: any[] = [];
	let unsubscribe: () => void;

	onMount(async () => {
		// Get initial events
		const resultList = await pb.collection('events').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});
		events = resultList.items;

		// Subscribe to realtime events
		unsubscribe = await pb.collection('events').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				// Fetch associated user
				const user = await pb.collection('users').getOne(record.user);
				record.expand = { user };
				events = [...events, record];
			}
			if (action === 'delete') {
				events = events.filter((m) => m.id !== record.id);
			}
		});
	});

	// Unsubscribe from realtime events
	onDestroy(() => {
		unsubscribe?.();
	});

	async function addEvent() {
		const data = {
			title: filter.clean(newTitle),
			user: $currentUser?.id,
			dueDate: newDate
		};
		await pb.collection('events').create(data);
		newTitle = '';
		newDate = '';
	}
</script>

<div class="events">
	{#each events as event (event.id)}
		<div class="msg">
			<img
				class="avatar"
				src={`https://avatars.dicebear.com/api/identicon/${event.expand?.user?.username}.svg`}
				alt="avatar"
				width="40px"
			/>
			<div>
				<small>
					Sent by @{event.expand?.user?.username}
				</small>
				<p class="msg-text">{event.title}</p>
				<p>{event.dueDate}</p>
			</div>
		</div>
	{/each}
</div>

<form on:submit|preventDefault={addEvent}>
	<input placeholder="Title" type="text" bind:value={newTitle} required />
	<input type="date" bind:value={newDate} required />
	<button type="submit">Send</button>
</form>
