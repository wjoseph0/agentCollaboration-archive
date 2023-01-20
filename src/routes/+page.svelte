<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<main class="container">
	<h1 style="text-align: center;">Welcome to OpenAgent</h1>
	{#if $currentUser?.username}
		<a href="./app"><button>View Dashboard</button></a>
	{:else}
		<a href="./signup"><button>Get Started</button></a>
	{/if}
</main>
