<script>
	import '../app.css';
	import AppNav from '$lib/components/AppNav.svelte';
	import { currentUser } from '$lib/pocketbase';
  import { navigating } from '$app/stores';
</script>

{#if $currentUser}
	<AppNav />
{/if}

<div class="container mx-auto md:w-8/12 lg:w-6/12 flex flex-col">
	<slot />
</div>
