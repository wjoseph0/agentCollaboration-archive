<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import CreateEvent from '$lib/components/CreateEvent.svelte';
	import Events from '$lib/components/Events.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	let events = [];

	const sortFunction = (a, b) => {
		const date1 = new Date(a.date);
		const date2 = new Date(b.date);
		return date1 - date2;
	};

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });

		events = await pb.collection('events').getFullList(200, { sort: '+date' });

		pb.collection('events').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				events.push(record);
				events = events.sort(sortFunction);
			} else if (action === 'update') {
				const i = events.findIndex((e) => e.id === record.id);
				events.splice(i, 1, record);
				events = events.sort(sortFunction);
			} else if (action === 'delete') {
				events = events.filter((e) => e.id !== record.id);
			}
		});
	});

	onDestroy(async () => {
		pb.collection('events').unsubscribe();
	});
</script>

{#if $currentUser}
	{#if $currentUser.isAgent && !$currentUser.focusedClient}
		<ChooseClient />
	{:else}
		<main class="container">
			<ClientBanner />
			<section id="events">
				<Events {events} />
			</section>
			<section>
				<CreateEvent />
			</section>
		</main>
	{/if}
{/if}

<style>
	main {
		height: 90vh;
		padding-top: 0;
		padding-bottom: 0;
		overflow: hidden;
	}

	#events {
		height: 75vh;
		padding: 1rem 0 1rem 0;
		margin-bottom: 0;
		overflow: scroll;
	}
</style>
