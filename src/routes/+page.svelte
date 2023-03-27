<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	<BuyerRoadmap />
{/if}
