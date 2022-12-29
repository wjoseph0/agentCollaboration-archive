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
		height: 100vh;
		display: grid;
		grid-template-columns: 100vw;
		grid-template-rows: 20vh auto 10vh;
	}

	header {
		font-family: Arial, Helvetica, sans-serif;
		color: lightcyan;
		background-color: darkslategray;
		display: grid;
		grid-template-columns: 100vw;
		grid-template-rows: auto;
	}
	header div {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	header a {
		text-decoration: none;
		color: lightcyan;
	}

	main,
	footer {
		font-family: Arial, Helvetica, sans-serif;
		color: lightcyan;
		background-color: darkslategray;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
