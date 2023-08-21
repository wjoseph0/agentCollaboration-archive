<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { page } from '$app/stores';

	$: path = $page.url.pathname;

	export let journey;
	let uploadFileForm;
	let fileName;
	let newFile;
	let clientsOnly = true;
	let publicFile = false;

	const uploadFile = async () => {
		const formData = new FormData();
		formData.append('owner', $currentUser.id);
		formData.append('file', newFile[0]);
		formData.append('name', fileName);

		if (path === '/files') {
			if (publicFile) {
				formData.append('isPublic', true);
			} else if (clientsOnly) {
				formData.append('clientsOnly', true);
			}
		}

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
				<!-- <button class="btn btn-secondary btn-outline" type="button" onclick="uf{journey.id}.close()"
					>Cancel</button
				> -->
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
				{#if $currentUser.isAgent}
					{#if clientsOnly}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="flex flex-row items-center cursor-pointer"
							on:click={() => {
								publicFile = true;
								clientsOnly = false;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Clients Only</span>
						</div>
					{:else if publicFile}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="flex flex-row items-center cursor-pointer"
							on:click={() => {
								publicFile = false;
								clientsOnly = true;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z"
									clip-rule="evenodd"
								/>
							</svg>

							<span>Public</span>
						</div>
					{/if}
				{/if}

				<!-- if there is a button in form, it will close the modal -->
				<!-- <button class="btn btn-secondary btn-outline" type="button" onclick="uploadFile.close()"
					>Cancel</button
				> -->
				<br />
				<button class="btn btn-primary" type="submit"> Upload </button>
			</div>
		</form>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{/if}
