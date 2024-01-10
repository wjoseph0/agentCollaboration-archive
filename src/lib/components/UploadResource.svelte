<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let resourceName;
	let newResource;
	let clientsOnly = true;
	let uploadResourceModal;
	let uploadResourceForm;
	let loading = false;
	let success = false;
	let failed = false;

	async function uploadResource() {
		loading = true;
		const formData = new FormData();
		formData.append('owner', $currentUser.id);
		formData.append('name', resourceName);
		formData.append('file', newResource[0]);
		if (clientsOnly) {
			formData.append('clientsOnly', true);
		}

		try {
			await pb.collection('resources').create(formData);
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
		uploadResourceForm.reset();
		clientsOnly = true;
	}
</script>

<button class="btn btn-primary btn-sm" onclick="uploadResourceModal.showModal()">Upload</button>

<dialog
	bind:this={uploadResourceModal}
	id="uploadResourceModal"
	class="modal modal-bottom sm:modal-middle"
>
	<form
		bind:this={uploadResourceForm}
		method="dialog"
		class="modal-box space-y-3"
		on:submit|preventDefault={uploadResource}
	>
		<h3 class="font-bold text-lg">Upload a resource</h3>
		<input
			type="text"
			class="input input-bordered"
			bind:value={resourceName}
			placeholder="Resource Name"
			required
		/>
		<input type="file" class="file-input" bind:files={newResource} required />
		<div class="modal-action">
			{#if clientsOnly}
				<div
					class="flex flex-row items-center cursor-pointer"
					on:click={() => {
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
			{:else}
				<div
					class="flex flex-row items-center cursor-pointer"
					on:click={() => {
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
					<span>Customers & Clients</span>
				</div>
			{/if}
			<br />
			{#if loading}
				<span class="btn btn-primary">
					<span class="loading loading-spinner loading-xs" />
				</span>
			{:else if success}
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
			{:else}
				<span
					class="btn btn-primary"
					on:click={() => {
						uploadResourceForm.requestSubmit();
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
			uploadResourceForm.reset();
			clientsOnly = true;
		}}
	>
		<button>close</button>
	</form>
</dialog>
