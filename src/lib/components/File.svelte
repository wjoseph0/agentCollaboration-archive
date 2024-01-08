<script>
	import { pb } from '$lib/pocketbase';
	export let file;

	let fileName = file.name;
	let loading = false;
	let fileLinkElement;
	let url = '';

	async function updateFile() {
		const data = {
			name: fileName
		};

		await pb.collection('files').update(file.id, data);
	}

	async function viewFile() {
		loading = true;
		const fileToken = await pb.files.getToken();
		url = pb.files.getUrl(file, file.file, { token: fileToken });
		loading = false;
		window.setTimeout(() => {
			fileLinkElement.click();
		}, 0);
	}
</script>

<dialog id="c{file.id}" class="modal">
	<form method="dialog" class="modal-box prose" on:click={updateFile}>
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<form on:submit|preventDefault={updateFile}>
			<input type="text" bind:value={fileName} class="input input-ghost w-full font-bold" />
		</form>
		<br />
		<div class="modal-action flex flex-row justify-end items-center">
			{#if loading}
				<span class="btn"><span class="loading loading-spinner loading-xs"></span></span>
			{:else}
				<span class="btn" on:click={viewFile}>View</span>
			{/if}
		</div>
	</form>

	<form method="dialog" class="modal-backdrop" on:click={updateFile}>
		<button>close</button>
	</form>
</dialog>
<a bind:this={fileLinkElement} href={url} class="hidden">Invisible link</a>
