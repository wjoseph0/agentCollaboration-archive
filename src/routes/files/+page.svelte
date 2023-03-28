<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';
	import MyFiles from '$lib/components/MyFiles.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	export let data;

	let files = data.files;

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	{#if $currentUser.isAgent && !$currentUser.focusedClient}
		<ChooseClient />
		<div style="width: 50%; margin:0 auto;">
			<MyFiles />
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
					<MyFiles />
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
