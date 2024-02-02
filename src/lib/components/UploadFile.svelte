<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { page } from '$app/stores';
	export let journey;

	$: path = $page.url.pathname;

	let uploadFileModal;
	let uploadFileForm;
	let fileName;
	let newFile;
	let loading = false;
	let success = false;
	let failed = false;

	const uploadFile = async () => {
		loading = true;
		const formData = new FormData();
		formData.append('file', newFile[0]);
		formData.append('name', fileName);
		if ($currentUser.isAgent) {
			formData.append('owner', $currentUser.id);
			formData.append('agent', $currentUser.id);
			formData.append('client', journey.client);
		} else {
			formData.append('owner', $currentUser.id);
			formData.append('agent', $currentUser.agent);
			formData.append('client', $currentUser.id);
		}

		try {
			await pb.collection('files').create(formData);
			success = true;
			setTimeout(() => {
				success = false;
			}, 2000);
		} catch (error) {
			failed = true;
			setTimeout(() => {
				failed = false;
			}, 2000);
		}
		loading = false;
		uploadFileForm.reset();
	};
</script>

{#if path === '/'}
	<span class="btn btn-neutral btn-xs rounded" onclick="uploadFileModal{journey.id}.showModal()"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg></span
	>
	<dialog
		bind:this={uploadFileModal}
		id="uploadFileModal{journey.id}"
		class="modal modal-bottom sm:modal-middle"
	>
		<form
			bind:this={uploadFileForm}
			method="dialog"
			class="modal-box space-y-3"
			on:submit|preventDefault={uploadFile}
		>
			<h3 class="font-bold text-lg">Upload a file</h3>
			<div class="form-control w-full">
				<label class="label" for="date">
					<span class="label-text">Name</span>
				</label>
				<input type="text" class="input input-bordered" bind:value={fileName} required />
			</div>

			<input type="file" class="file-input" bind:files={newFile} required />
			<div class="modal-action">
				{#if success}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-success"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if failed}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-fail"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if loading}
					<span class="btn btn-primary" type="submit">
						<span class="loading loading-spinner loading-xs" />
					</span>
				{:else}
					<span
						class="btn btn-primary w-full"
						on:click={() => {
							uploadFileForm.requestSubmit();
						}}
					>
						Upload
					</span>
				{/if}
			</div>
		</form>
		<form
			method="dialog"
			class="modal-backdrop"
			on:click={() => {
				uploadFileForm.reset();
			}}
		>
			<button>close</button>
		</form>
	</dialog>
{:else if path === '/files'}
	<button
		class="btn btn-primary w-full sm:mx-auto sm:w-3/4 fixed inset-x-0 bottom-16 z-40"
		onclick="uploadFileModal.showModal()">Upload</button
	>
	<dialog
		bind:this={uploadFileModal}
		id="uploadFileModal"
		class="modal modal-bottom sm:modal-middle"
	>
		<form
			bind:this={uploadFileForm}
			method="dialog"
			class="modal-box space-y-3"
			on:submit|preventDefault={uploadFile}
		>
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
				{#if success}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-success"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if failed}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-fail"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if loading}
					<span class="btn btn-primary" type="submit">
						<span class="loading loading-spinner loading-xs" />
					</span>
				{:else}
					<span
						class="btn btn-primary"
						on:click={() => {
							uploadFileForm.requestSubmit();
						}}
					>
						Upload
					</span>
				{/if}
			</div>
		</form>
		<form
			method="dialog"
			class="modal-backdrop"
			on:click={() => {
				uploadFileForm.reset();
			}}
		>
			<button>close</button>
		</form>
	</dialog>
{/if}
