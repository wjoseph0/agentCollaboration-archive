<script>
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import FilesPage from '$lib/components/FilesPage.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}
</script>

{#if $currentUser}
	<FilesPage />
{/if}
