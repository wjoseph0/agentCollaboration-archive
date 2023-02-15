<script>
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';

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
		<BuyerRoadmap />
	</main>
{/if}

<style>
	main {
		height: 90vh;
		padding-bottom: 0;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	::-webkit-scrollbar {
		display: none;
	}
</style>
