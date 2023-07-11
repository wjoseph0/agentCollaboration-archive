<script>
	import { pb } from '$lib/pocketbase';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';
	import Files from './Files.svelte';

	export let file;

	let fileName = file.name;

	const updateFileName = async () => {
		const data = {
			name: fileName
		};

		await pb.collection('files').update(file.id, data);
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{file.id}" class="modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<form method="dialog" class="modal-box prose" on:click={updateFileName}>
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<form on:submit|preventDefault={updateFileName}>
			<input type="text" bind:value={fileName} class="input input-ghost w-full font-bold" />
		</form>
		<br />
		<div class="modal-action">
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
	<form method="dialog" class="modal-backdrop" on:click={updateFileName}>
		<button>close</button>
	</form>
</dialog>
