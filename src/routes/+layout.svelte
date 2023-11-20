<script>
	import '../app.css';
	import AppNav from '$lib/components/AppNav.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser && !$currentUser.isCoordinator}
	<AppNav />
{/if}

<slot />
