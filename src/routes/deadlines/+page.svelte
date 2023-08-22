<script>
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import DeadlinesPage from '$lib/components/DeadlinesPage.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}
</script>

{#if $currentUser}
	<DeadlinesPage />
{/if}
