<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<nav class="container">
	<ul>
		<li><a href="/">Home</a></li>
		{#if ($currentUser.isAgent && $currentUser.focusedClient) || (!$currentUser.isAgent && $currentUser.agent)}
			<li><a href="/chat">Chat</a></li>
			<li><a href="/files">Files</a></li>
			<li><a href="/map">Map</a></li>
		{/if}
	</ul>
	<ul>
		<li><a href="/account">Account</a></li>
	</ul>
</nav>

<style>
	.container {
		height: 10vh;
	}
</style>
