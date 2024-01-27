<script>
	import '../app.css';
	import { currentUser } from '$lib/pocketbase';
	import AppNav from '$lib/components/AppNav.svelte';
</script>

{#if $currentUser}
	<AppNav />
{/if}
<slot />
