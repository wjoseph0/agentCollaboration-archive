<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';
	import '@picocss/pico';

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

			<section>
				<BuyerRoadmap />
			</section>
		</main>
	{/if}
{/if}

<style>
	main {
		height: 90vh;
		padding-top: 0;
		padding-bottom: 0;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	section {
		margin-top: 4rem;
	}

	::-webkit-scrollbar {
		display: none;
	}
</style>
