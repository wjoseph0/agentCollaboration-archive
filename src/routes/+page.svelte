<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import AgentDashboard from '$lib/components/AgentDashboard.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({ expand: 'agent' });
	});
</script>

{#if $currentUser && $currentUser.isAgent}
	<AgentDashboard />
{/if}
