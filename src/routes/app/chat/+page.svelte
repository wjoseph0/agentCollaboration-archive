<script>
	import Contacts from '$lib/components/Contacts.svelte';
</script>

<main class="container">
	<h1>Chat</h1>
	<section>
		<Contacts />
	</section>
</main>

<style>
	main {
		height: 90vh;
		display: grid;
		overflow-y: hidden;
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
