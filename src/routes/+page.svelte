<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<div>
	<h2>Welcome to Open Agent!</h2>
	{#if $currentUser?.username}
		<a href="./app"><button>Go to app</button></a>
	{:else}
		<a href="./signup"><button>Get Started</button></a>
	{/if}
</div>

<style>
	button {
		margin-top: 5px;
		padding: 10px;
		height: 50px;
		width: 100px;
		background-color: lightcyan;
		border: none;
		border-radius: 10px;
	}

	button:is(:hover, :focus) {
		background-color: rgba(224, 255, 255, 0.9);
		cursor: pointer;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 70vh;
	}
</style>
