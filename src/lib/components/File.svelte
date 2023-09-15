<script>
	import { pb, currentUser } from '$lib/pocketbase';

	export let file;

	let fileName = file.name;
	let isPublic = file.isPublic;
	let clientsOnly = file.clientsOnly;
	let loading = false;
	let fileLinkElement;
	let url = '';

	const updateFile = async () => {
		const data = {
			name: fileName,
			isPublic: isPublic,
			clientsOnly: clientsOnly
		};

		await pb.collection('files').update(file.id, data);
	};

	const viewFile = async () => {
		loading = true;
		// generate a file token
		const fileToken = await pb.files.getToken();

		// retrieve and go to the protected file url (will be valid ~5min)
		url = pb.files.getUrl(file, file.file, { token: fileToken });
		loading = false;
		window.setTimeout(() => {
			fileLinkElement.click();
		}, 0);
	};

	const deleteFile = async () => {
		await pb.collection('files').delete(file.id);
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{file.id}" class="modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<form method="dialog" class="modal-box prose" on:click={updateFile}>
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<form on:submit|preventDefault={updateFile}>
			<input type="text" bind:value={fileName} class="input input-ghost w-full font-bold" />
		</form>
		<br />
		<div class="modal-action flex flex-row justify-between items-center">
			{#if $currentUser.isAgent && (file.isPublic || file.clientsOnly)}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="hover:brightness-75" on:click={deleteFile}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5 text-error"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</div>
			{:else}
				<div />
			{/if}

			<div class="flex gap-4">
				{#if $currentUser.isAgent}
					{#if file.isPublic}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="flex flex-row justify-end items-center cursor-pointer"
							on:click={() => {
								isPublic = false;
								clientsOnly = true;
								updateFile();
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
						</div>
					{:else if !file.isPublic && !file.client}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="flex flex-row items-center cursor-pointer"
							on:click={() => {
								isPublic = true;
								clientsOnly = false;
								updateFile();
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
						</div>
					{/if}
				{/if}

				{#if loading}
					<span class="btn"><span class="loading loading-spinner loading-xs"></span></span>
				{:else}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span class="btn" on:click={viewFile}>View</span>
				{/if}
			</div>
		</div>
	</form>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<form method="dialog" class="modal-backdrop" on:click={updateFile}>
		<button>close</button>
	</form>
</dialog>
<a bind:this={fileLinkElement} href={url} class="hidden">Invisible link</a>
