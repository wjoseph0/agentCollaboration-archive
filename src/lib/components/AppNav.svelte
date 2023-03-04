<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<nav class="container">
	<ul>
		{#if ($currentUser.isAgent && $currentUser.focusedClient) || (!$currentUser.isAgent && $currentUser.agent)}
			<li><a href="/"><i class="bi bi-compass-fill" /></a></li>
			<li>
				{#if $currentUser.isAgent}
					<a href="/chat/{$currentUser.focusedClient}"
						><i class="bi bi-chat-right-text-fill" /></a
					>
				{:else if !$currentUser.isAgent}
					<a href="/chat/{$currentUser.agent}"
						><i class="bi bi-chat-right-text-fill" /></a
					>
				{/if}
			</li>
			<li><a href="/files"><i class="bi bi-folder-fill" /></a></li>
		{/if}

		<li><a href="/account"><i class="bi bi-person-fill" /></a></li>
	</ul>
</nav>

<style>
	.container {
		height: 0;
		width: 100%;
	}

	@media (min-width: 576px) {
		.container {
			height: 10vh;
		}

		ul {
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
	}

	i {
		font-size: 2em;
	}

	@media (max-width: 576px) {
		ul {
			display: flex;
			height: 10vh;
			width: 100%;
			padding: inherit;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
		}
	}
</style>
