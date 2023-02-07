<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import Clients from '$lib/components/Clients.svelte';
	import FindUser from '$lib/components/FindUser.svelte';

	let expandedCurrentUser;

	onMount(async () => {
		expandedCurrentUser = await pb
			.collection('users')
			.getOne($currentUser?.id, {
				expand: 'agent,clients'
			});
	});
</script>

{#if $currentUser}
	{#if expandedCurrentUser}
		{#if expandedCurrentUser.agent && !expandedCurrentUser.isAgent}
			<main class="container" id="user">
				<section id="messages">
					<Messages recipient={expandedCurrentUser.expand.agent} />
				</section>
				<section>
					<NewMessage recipient={expandedCurrentUser.expand.agent} />
				</section>
			</main>
		{:else if expandedCurrentUser.isAgent}
			<main class="container">
				<section>
					<FindUser {expandedCurrentUser} />
				</section>
				<section>
					<Clients {expandedCurrentUser} />
				</section>
			</main>
		{:else}
			<main class="container">
				<section>
					<FindUser {expandedCurrentUser} />
				</section>
			</main>
		{/if}
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
