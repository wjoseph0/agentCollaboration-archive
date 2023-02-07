<script>
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<main class="container">
		<h2>Hello, {$currentUser?.fname}</h2>
	</main>
{/if}
