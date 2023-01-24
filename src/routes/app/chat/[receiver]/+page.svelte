<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	export let data;
</script>

<main class="container">
	<section>
		<Messages receiver={data.receiver} />
	</section>
	<section>
		<NewMessage receiver={data.receiver} />
	</section>
</main>
