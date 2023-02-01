<script>
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
</script>

<main class="container">
	<h1>Buyer Roadmap</h1>
	<section>
		<BuyerRoadmap />
	</section>
</main>

<style>
	.container {
		height: 90vh;
		display: grid;
	}

	section {
		overflow-y: scroll;
	}

	/* width */
	::-webkit-scrollbar {
		width: 1px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: hsl(205deg, 16%, 77%);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
