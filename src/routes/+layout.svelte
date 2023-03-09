<script>
	import '@picocss/pico';
	import AppNav from '$lib/components/AppNav.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { navigating } from '$app/stores';
</script>

{#if $currentUser}
	<AppNav />
{/if}

{#if $navigating}
	<div aria-busy="true" />
{:else}
	<slot />
{/if}
