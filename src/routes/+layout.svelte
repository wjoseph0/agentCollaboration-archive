<script>
	import '@picocss/pico';
	import AppNav from '$lib/components/AppNav.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<AppNav />
{/if}

<slot />
