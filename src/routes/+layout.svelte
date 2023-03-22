<script>
	import '../app.css';
	import AppNav from '$lib/components/AppNav.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && !$currentUser) {
		goto('/login');
	}
</script>

{#if $currentUser}
	<AppNav />
{/if}

<div class="container mx-auto md:w-8/12 lg:w-6/12">
	<slot />
</div>
