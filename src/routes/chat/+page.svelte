<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ClientBanner from '$lib/components/ClientBanner.svelte';

	$: if (
		browser &&
		(($currentUser.isAgent && !$currentUser.focusedClient) ||
			(!$currentUser.isAgent && !$currentUser.agent))
	) {
		goto('/account');
	}
</script>

{#if $currentUser}
	<main class="container" id="chatContainer">
		<ClientBanner />

		{#if $currentUser.focusedClient && $currentUser.isAgent}
			<section id="messages">
				<Messages recipient={$currentUser.expand.focusedClient} />
			</section>
			<section id="newMessage">
				<NewMessage recipient={$currentUser.expand.focusedClient} />
			</section>
		{:else if $currentUser.agent && !$currentUser.isAgent}
			<section id="messages">
				<Messages recipient={$currentUser.expand.agent} />
			</section>
			<section id="newMessage">
				<NewMessage recipient={$currentUser.expand.agent} />
			</section>
		{/if}
	</main>
{/if}

<style>
	#chatContainer {
		height: 90vh;
		display: grid;
		padding-top: 0;
		padding-bottom: 0;
		overflow-y: hidden;
	}

	#messages {
		margin-bottom: 0;
		padding-top: 1em;
		padding-right: 0.5em;
		height: 70vh;
	}

	#newMessage {
		margin-bottom: 0;
		height: 50px;
	}
</style>
