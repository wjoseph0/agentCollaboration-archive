<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});

	export let data;

	let files = data.files;
</script>

{#if $currentUser}
	<main class="container">
		<ClientBanner />
		<section id="filesContainer">
			<h2>Files</h2>
			<Files {files} />
		</section>
		<section id="uploadFile">
			<UploadFile />
		</section>
	</main>
{/if}

<style>
	main {
		height: 90vh;
		padding-top: 0;
		padding-bottom: 0;
		overflow: hidden;
	}

	#filesContainer {
		height: 75vh;
		padding: 1rem 0 1rem 0;
		margin-bottom: 0;
		overflow: scroll;
	}

	#uploadFile {
		height: 5vh;
		margin-bottom: 0;
	}
</style>
