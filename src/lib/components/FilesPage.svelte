<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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

<div class="container">
	<br />
	{#if $currentUser.isAgent}
		<div class="prose text-center sm:text-left">
			<h1>My Files</h1>
		</div>
	{:else}
		<div class="prose text-center mx-auto">
			<h1>Files</h1>
		</div>
	{/if}
	<br />
	<div class="overflow-y-auto h-auto">
		<Files {files} />
		<br />
		<br />
		<br />
		<br />
		<br />
	</div>
</div>
<UploadFile />
