<script>
	import '@picocss/pico';
	import AppNav from '$lib/components/AppNav.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';

	$: if (browser && !$currentUser) {
		goto('/login');
	}
</script>

{#if $currentUser}
	<AppNav />
{/if}

{#if $navigating}
	<div aria-busy="true" />
{:else}
	<slot />
{/if}
