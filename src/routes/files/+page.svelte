<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ClientBanner from '$lib/components/ClientBanner.svelte';
	import { onMount } from 'svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	$: if (
		browser &&
		(($currentUser.isAgent && !$currentUser.focusedClient) ||
			(!$currentUser.isAgent && !$currentUser.agent))
	) {
		goto('/account');
	}

	onMount(async () => {
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});

	export let data;

	let files = data.files;
</script>

{#if $currentUser}
	<main class="container">
		<ClientBanner />
		<section id="filesContainer">
			<section>
				<UploadFile />
			</section>

			<h2>Files</h2>
			<Files {files} />
		</section>
	</main>
{/if}

<style>
	main {
		padding-top: 0;
		padding-bottom: 0;
		height: 90vh;
	}

	#filesContainer {
		margin-top: 1rem;
	}
</style>
