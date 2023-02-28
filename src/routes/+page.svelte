<script>
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';

	$: if (
		browser &&
		(($currentUser.isAgent && !$currentUser.focusedClient) ||
			(!$currentUser.isAgent && !$currentUser.agent))
	) {
		goto('/account');
	}
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
