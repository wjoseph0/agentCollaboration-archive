<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';
	import MyFiles from '$lib/components/MyFiles.svelte';
	import '@picocss/pico';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	let files = [];

	const sortFunction = (a, b) => {
		const date1 = new Date(a.created);
		const date2 = new Date(b.created);
		return date2 - date1;
	};

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });

		files = await pb.collection('files').getFullList(200, { sort: '-created' });

		pb.collection('files').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				files.push(record);
				files = files.sort(sortFunction);
			} else if (action === 'update') {
				const i = files.findIndex((e) => e.id === record.id);
				files.splice(i, 1, record);
				files = files.sort(sortFunction);
			} else if (action === 'delete') {
				files = files.filter((f) => f.id !== record.id);
			}
		});
	});

	onDestroy(async () => {
		pb.collection('files').unsubscribe();
	});
</script>

{#if $currentUser}
	{#if $currentUser.isAgent && !$currentUser.focusedClient}
		<ChooseClient />
		<div style="width: 50%; margin:0 auto;">
			<MyFiles {files} />
		</div>
	{:else}
		<main class="container">
			<ClientBanner />
			{#if $currentUser.isAgent}
				<section id="filesContainerAgent">
					<Files {files} />
				</section>
				<section id="agentActions">
					<UploadFile />
					<MyFiles {files} />
				</section>
			{:else}
				<section id="filesContainerClient">
					<Files {files} />
				</section>
				<section id="clientAction">
					<UploadFile />
				</section>
			{/if}
		</main>
	{/if}
{/if}

<style>
	main {
		height: 90vh;
		padding-top: 0;
		padding-bottom: 0;
		overflow: hidden;
	}

	#filesContainerAgent {
		height: 65vh;
		padding: 1rem 0 1rem 0;
		margin-bottom: 0;
		overflow: scroll;
	}

	#filesContainerClient {
		height: 75vh;
		padding: 1rem 0 1rem 0;
		margin-bottom: 0;
		overflow: scroll;
	}

	#agentActions {
		height: 15vh;
		margin-bottom: 0;
	}

	#clientAction {
		height: 5vh;
		margin-bottom: 0;
	}
</style>
