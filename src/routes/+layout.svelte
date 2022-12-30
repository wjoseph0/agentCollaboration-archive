<script>
	import GitHublogo from '$lib/assets/GitHub-logo.png';
	import Signout from '$lib/components/Signout.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

<div class="grid-container">
	<header>
		<div><a href="/"><h1>Open Agent</h1></a></div>
		{#if $currentUser?.username}
			<div><Signout /></div>
		{/if}
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<a href="https://github.com/wjoseph0/open-agent">
			<img src={GitHublogo} alt="Link to GitHub repo" />
		</a>
	</footer>
</div>

<style>
	.grid-container {
		width: 100vw;
		height: 105vh;
		display: grid;
		align-items: center;
		justify-items: center;
		grid-template-columns: 100vw;
		background-color: darkslategray;
	}

	header {
		font-family: Arial, Helvetica, sans-serif;
		color: lightcyan;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 10vh;
		width: 500px;
		max-width: 100vw;
	}
	header div {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 10vh;
		width: 250px;
		max-width: 50vw;
	}

	header a {
		text-decoration: none;
		color: lightcyan;
	}

	main,
	footer {
		font-family: Arial, Helvetica, sans-serif;
		color: lightcyan;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	main {
		height: 90vh;
	}

	footer {
		height: 5vh;
	}
</style>
