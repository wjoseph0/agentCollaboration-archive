<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
		events = await pb.collection('events').getFullList(200, { sort: '+date' });
		await pb.collection('events').subscribe('*', async () => {
			events = await pb.collection('events').getFullList(200, { sort: '+date' });
		});
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
