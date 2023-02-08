<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	import { currentUser } from '$lib/pocketbase';
	import Clients from '$lib/components/Clients.svelte';
	import FindUser from '$lib/components/FindUser.svelte';
</script>

{#if $currentUser}
	{#if $currentUser.agent && !$currentUser.isAgent}
		<main class="container" id="user">
			<section id="messages">
				<Messages recipient={$currentUser.expand.agent} />
			</section>
			<section>
				<NewMessage recipient={$currentUser.expand.agent} />
			</section>
		</main>
	{:else if $currentUser.isAgent}
		<main class="container">
			<section>
				<FindUser />
			</section>
			<section>
				<Clients expandedCurrentUser={$currentUser} />
			</section>
		</main>
	{:else}
		<main class="container">
			<section>
				<FindUser />
			</section>
		</main>
	{/if}
{/if}

<style>
	#user {
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
