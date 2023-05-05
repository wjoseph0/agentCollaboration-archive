<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';
	const isPWA = (win) =>
		!!(win.matchMedia?.('(display-mode: standalone)').matches || 
                (win.navigator).standalone);
	let showLanding = false;
	onMount(() => {
		console.log('Are we native?', Capacitor.isNativePlatform());
		if (Capacitor.isNativePlatform()) {
			console.log('Found native shell, redirecting');
			goto('/app/login');
			return;
		}
		if (isPWA(window)) {
			console.log('In PWA - on wrong route - redirecting');
			goto('/app');
		} else showLanding = !isPWA(window);
	});
</script>
{#if showLanding}
    <h1>Hello world!</h1>
	<button on:click={() => goto('/app')}>Go to app</button>
{/if}