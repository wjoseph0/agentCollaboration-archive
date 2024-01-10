<script>
	import { pb, currentUser } from '$lib/pocketbase';
	export let resource;

	let resourceName = resource.name;
	let clientsOnly = resource.clientsOnly;
	let resourceLinkElement;
	let resourceUrl = '';
	let loading = false;

	async function viewResource() {
		loading = true;
		const fileToken = await pb.files.getToken();

		resourceUrl = pb.files.getUrl(resource, resource.file, { token: fileToken });
		loading = false;
		window.setTimeout(() => {
			resourceLinkElement.click();
		}, 0);
	}

	async function updateResource() {
		const data = {
			name: resourceName,
			clientsOnly: clientsOnly
		};
		await pb.collection('resources').update(resource.id, data);
	}

	async function deleteResource() {
		await pb.collection('resources').delete(resource.id);
	}
</script>

<dialog id="resourceModal_{resource.id}" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<form on:submit|preventDefault={updateResource}>
			<input type="text" bind:value={resourceName} class="input input-ghost w-full font-bold" />
		</form>
		<br />
		<div class="modal-action flex flex-row justify-between items-center">
			{#if $currentUser.isAgent}
				<div class="hover:brightness-75 hover:cursor-pointer" on:click={deleteResource}>
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
					{#if resource.clientsOnly}
						<div
							class="flex flex-row items-center cursor-pointer"
							on:click={() => {
								clientsOnly = false;
								updateResource();
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
							class="flex flex-row justify-end items-center cursor-pointer"
							on:click={() => {
								clientsOnly = true;
								updateResource();
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
				{/if}

				{#if loading}
					<span class="btn"><span class="loading loading-spinner loading-xs"></span></span>
				{:else}
					<span class="btn" on:click={viewResource}>View</span>
				{/if}
			</div>
		</div>
	</form>

	<form method="dialog" class="modal-backdrop" on:click={updateResource}>
		<button>close</button>
	</form>
</dialog>
<a bind:this={resourceLinkElement} href={resourceUrl} class="hidden">Invisible link</a>
