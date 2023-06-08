<script>
	import Messages from '$lib/components/Messages.svelte';
	import NewMessage from '$lib/components/NewMessage.svelte';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';
	import '@picocss/pico';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	let messages = [];

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });

		const result = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});

		messages = result.items;

		await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				const user = await pb.collection('users').getOne(record.user);
				record.expand = { user };
				messages = [...messages, record];
			}
		});
	});

	onDestroy(() => {
		pb.collection('messages').unsubscribe();
	});
</script>

{#if $currentUser}
	{#if $currentUser.isAgent && !$currentUser.focusedClient}
		<ChooseClient />
	{:else}
		<main class="container" id="chatContainer">
			<ClientBanner />

			<section id="messages">
				<Messages {messages} />
			</section>
			{#if $currentUser.focusedClient && $currentUser.isAgent}
				<section id="newMessage">
					<NewMessage recipient={$currentUser.expand.focusedClient} />
				</section>
			{:else if $currentUser.agent && !$currentUser.isAgent}
				<section id="newMessage">
					<NewMessage recipient={$currentUser.expand.agent} />
				</section>
			{/if}
		</main>
	{/if}
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
