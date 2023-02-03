<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	export let data;

	let recipient;

	onMount(async () => {
		recipient = await pb.collection('users').getOne(data.recipient);
	});
</script>

{#if recipient}
	<main class="container">
		<section id="messages">
			<Messages {recipient} />
		</section>
		<section>
			<NewMessage {recipient} />
		</section>
	</main>
{/if}

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
		background: #11191f;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: hsl(205deg, 16%, 77%);
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: rgb(185, 185, 185);
	}
</style>
