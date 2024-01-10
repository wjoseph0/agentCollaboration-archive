<script>
	import PoweredBy from '$lib/components/PoweredBy.svelte';
	import Resources from '$lib/components/Resources.svelte';
	import FilesTable from '$lib/components/FilesTable.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { pb } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';

	let files = [];
	let loading = false;

	onMount(async () => {
		loading = true;

		await pb.collection('users').authRefresh({ expand: 'agent' });

		files = await pb
			.collection('files')
			.getFullList(200, { expand: 'client', sort: '-created', filter: 'client != ""' });

		pb.collection('files').subscribe('*', async () => {
			files = await pb
				.collection('files')
				.getFullList(200, { expand: 'client', sort: '-created', filter: 'client != ""' });
		});
		loading = false;
	});

	onDestroy(async () => {
		pb.collection('files').unsubscribe();
	});
</script>

<div class="container">
	<div class="prose text-center mx-auto mt-5">
		<h1 class="mb-4">Files</h1>
		<PoweredBy />
		<br />
		<Resources />
	</div>
	<br />
	<div class="mb-64">
		<FilesTable {files} {loading} />
	</div>
</div>
<UploadFile />
