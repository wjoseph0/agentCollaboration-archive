<script>
	import Clients from '$lib/components/Clients.svelte';
</script>

<section class="noClientFocus">
	<h2>Select a client:</h2>
	<Clients />
</section>

<style>
	.noClientFocus {
		display: flex;
		justify-content: center;
	}
</style>
