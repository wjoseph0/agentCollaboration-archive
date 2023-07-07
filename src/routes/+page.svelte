<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import AgentDashboard from '../lib/components/AgentDashboard.svelte';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	{#if $currentUser.isAgent}
		<AgentDashboard />
	{:else}
		<BuyerRoadmap />
	{/if}
{/if}
