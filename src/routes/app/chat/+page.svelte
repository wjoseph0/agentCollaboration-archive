<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '../../../lib/components/NewMessage.svelte';
</script>

<main class="container">
	<section id="messages">
		<Messages />
	</section>
	<section>
		<NewMessage />
	</section>
</main>
