<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { page } from '$app/stores';

	$: path = $page.url.pathname;

	export let journey;
	let uploadFileForm;
	let fileName;
	let newFile;

	const uploadFile = async () => {
		const formData = new FormData();
		formData.append('owner', $currentUser.id);
		formData.append('file', newFile[0]);
		formData.append('name', fileName);
		if ($currentUser.isAgent) {
			formData.append('agent', $currentUser.id);
			if (journey) {
				formData.append('client', journey.client);
			}
		} else if (!$currentUser.isAgent) {
			formData.append('agent', $currentUser.agent);
			formData.append('client', $currentUser.id);
		}
		await pb.collection('files').create(formData);
		uploadFileForm.close();
		fileName = undefined;
		newFile = null;
	};
</script>

<!-- Open the modal using ID.showModal() method -->
{#if path === '/'}
	<span class="btn btn-primary btn-sm" onclick="uf{journey.id}.showModal()">Upload</span>
	<dialog bind:this={uploadFileForm} id="uf{journey.id}" class="modal modal-bottom sm:modal-middle">
		<form method="dialog" class="modal-box space-y-3" on:submit|preventDefault={uploadFile}>
			<h3 class="font-bold text-lg">Upload a file</h3>
			<input
				type="text"
				class="input input-bordered"
				bind:value={fileName}
				placeholder="File Name"
				required
			/>
			<input type="file" class="file-input" bind:files={newFile} required />
			<div class="modal-action">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn btn-secondary btn-outline" type="button" onclick="uf{journey.id}.close()"
					>Cancel</button
				>
				<button class="btn btn-primary" type="submit"> Upload </button>
			</div>
		</form>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{:else if path === '/files'}
	<button
		class="btn btn-primary w-full sm:mx-auto sm:w-3/4 fixed inset-x-0 bottom-16 z-40"
		onclick="uploadFile.showModal()">Upload</button
	>
	<dialog bind:this={uploadFileForm} id="uploadFile" class="modal modal-bottom sm:modal-middle">
		<form method="dialog" class="modal-box space-y-3" on:submit|preventDefault={uploadFile}>
			<h3 class="font-bold text-lg">Upload a file</h3>
			<input
				type="text"
				class="input input-bordered"
				bind:value={fileName}
				placeholder="File Name"
				required
			/>
			<input type="file" class="file-input" bind:files={newFile} required />
			<div class="modal-action">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn btn-secondary btn-outline" type="button" onclick="uploadFile.close()"
					>Cancel</button
				>
				<button class="btn btn-primary" type="submit"> Upload </button>
			</div>
		</form>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{/if}
