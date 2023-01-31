<script>
	import { pb } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';

	let files = [];

	onMount(async () => {
		files = await pb.collection('files').getFullList(200, {
			sort: '-created'
		});

		// Subscribe to realtime files
		await pb.collection('files').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				files = [...files, record];
			}
			if (action === 'delete') {
				files = files.filter((f) => f.id !== record.id);
			}
		});
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		pb.collection('files').unsubscribe();
	});
</script>

{#each files as file}
	<a
		href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
	>
		<p>{file.name}</p>
	</a>
{/each}
