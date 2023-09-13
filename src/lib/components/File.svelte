<script>
	import { pb, currentUser } from '$lib/pocketbase';

	export let file;

	let fileName = file.name;
	let isPublic = file.isPublic;
	let clientsOnly = file.clientsOnly;

	const updateFile = async () => {
		const data = {
			name: fileName,
			isPublic: isPublic,
			clientsOnly: clientsOnly
		};

		await pb.collection('files').update(file.id, data);
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{file.id}" class="modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<form method="dialog" class="modal-box prose" on:click={updateFile}>
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<form on:submit|preventDefault={updateFile}>
			<input type="text" bind:value={fileName} class="input input-ghost w-full font-bold" />
		</form>
		<br />
		<div class="modal-action flex flex-row justify-between items-center">
			{#if $currentUser.isAgent}
				{#if file.isPublic}
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
				{:else if file.client}
					<div class="flex flex-row justify-end items-center">
						<div class="avatar placeholder">
							<div class="bg-neutral-focus text-neutral-content rounded-full w-8">
								<span class="text-xs" />
							</div>
						</div>
					</div>
				{/if}
			{:else if !$currentUser.isAgent}
				<div />
			{/if}
			<a
				target="_blank"
				rel="noreferrer"
				href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
			>
				<span class="btn">View</span>
			</a>
		</div>
	</form>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<form method="dialog" class="modal-backdrop" on:click={updateFile}>
		<button>close</button>
	</form>
</dialog>
