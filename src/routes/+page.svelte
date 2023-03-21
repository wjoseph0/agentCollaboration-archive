<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	<main class="container">
		<ClientBanner />

		<section>
			<BuyerRoadmap />
		</section>
	</main>
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
		margin-top: 2rem;
	}

	::-webkit-scrollbar {
		display: none;
	}
</style>
