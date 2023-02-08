<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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
		{#if $currentUser.focusedClient && $currentUser.isAgent}
			<section id="messages">
				<Messages recipient={$currentUser.expand.focusedClient} />
			</section>
			<section>
				<NewMessage recipient={$currentUser.expand.focusedClient} />
			</section>
		{:else if $currentUser.agent && !$currentUser.isAgent}
			<section id="messages">
				<Messages recipient={$currentUser.expand.agent} />
			</section>
			<section>
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
