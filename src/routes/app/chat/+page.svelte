<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '../../../lib/components/NewMessage.svelte';
</script>

<main class="container">
	<section id="messages">
		<Messages />
	</section>
	<section id="newMessageForm">
		<NewMessage />
	</section>
</main>

<style>
	.container {
		height: 90vh;
		display: grid;
		grid-template-rows: 9fr 1fr;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	#messages {
		overflow-y: scroll;
	}

	#newMessageForm {
		margin-bottom: 0;
	}
</style>
