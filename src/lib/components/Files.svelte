<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let files = ['loading'];
	let filter;

	if ($currentUser.isAgent && $currentUser.focusedClient) {
		filter = 'client = agent.focusedClient';
	} else if (!currentUser.isAgent && $currentUser.agent) {
		filter = 'agent = client.agent';
	}

	onMount(async () => {
		files = await pb.collection('files').getFullList(200, {
			sort: '-created',
			filter: filter
		});
	});
</script>

{#each files as file}
	{#if file == 'loading'}
		<div aria-busy="true" />
	{:else}
		<a
			target="_blank"
			rel="noreferrer"
			href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
		>
			<p>
				<img
					src="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}?thumb=100x300"
					alt=" "
					style="width: 100px"
				/>{file.name}
			</p>
		</a>
	{/if}
{/each}
