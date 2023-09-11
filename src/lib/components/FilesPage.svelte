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
	let loading = false;

	const sortFunction = (a, b) => {
		const date1 = new Date(a.created);
		const date2 = new Date(b.created);
		return date2 - date1;
	};

	onMount(async () => {
		loading = true;
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
		loading = false;
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
	{#if !$currentUser.isAgent}
		{#if $currentUser.expand.agent.teamLogo}
			<div class="flex justify-center items-center gap-2 md:mt-3">
				<span class="prose italic">powered by</span>
				<img
					class="w-20 md:w-28"
					src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
						.expand.agent.teamLogo}"
					alt="Team Logo"
				/>
			</div>
		{:else if $currentUser.expand.agent.brokerageLogo}
			<div class="flex justify-center items-center gap-2 md:mt-3">
				<span class="prose italic">powered by</span>
				<img
					class="w-20 md:w-28"
					src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
						.expand.agent.brokerageLogo}"
					alt="Team Logo"
				/>
			</div>
		{/if}
	{/if}
	<div class="overflow-y-auto h-auto">
		<Files {files} {loading} />
		<br />
		<br />
		<br />
		<br />
		<br />
	</div>
</div>
<UploadFile />
