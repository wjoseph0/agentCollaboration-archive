<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	{#if $currentUser.isAgent && !$currentUser.focusedClient}
		<ChooseClient />
	{:else}
		<main class="container">
			<ClientBanner />
			<BuyerRoadmap />
		</main>
	{/if}
{/if}
