<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	export let data;
</script>

<main class="container">
	<section id="messages">
		<Messages />
	</section>
	<section>
		<NewMessage receiver={data.receiver} />
	</section>
</main>

<style>
	main {
		height: 90vh;
		display: grid;
		padding-top: 0;
		padding-bottom: 0;
		overflow-y: hidden;
	}

	section {
		margin-bottom: 0;
	}

	#messages {
		overflow-y: scroll;
		height: 80vh;
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
