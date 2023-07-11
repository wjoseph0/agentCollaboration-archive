<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import SettingsPage from '$lib/components/SettingsPage.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients' });
	});
</script>

{#if $currentUser}
	<SettingsPage />
{/if}
