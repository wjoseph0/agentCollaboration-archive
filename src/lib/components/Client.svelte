<script>
	import { pb } from '$lib/pocketbase';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';
	import Files from './Files.svelte';
	import UploadFile from './UploadFile.svelte';

	export let journey;
	export let files;

	$: filteredFiles = files.filter((file) => file.client === journey.client);

	const updateStage = async () => {
		let data;

		if (journey.step === 1) {
			data = { step: 2 };
		} else if (journey.step === 2) {
			data = { step: 3 };
		} else if (journey.step === 3) {
			data = { step: 4 };
		} else if (journey.step === 4) {
			data = { step: 5 };
		} else if (journey.step === 5) {
			data = { step: 1 };
		}

		await pb.collection('journeys').update(journey.id, data);
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{journey.id}" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<div class="flex flex-row items-end">
			{#if journey.step === 1}
				<div class="btn btn-xs" on:click={updateStage}>Preparation</div>
			{:else if journey.step === 2}
				<div class="btn btn-xs btn-secondary" on:click={updateStage}>Searching</div>
			{:else if journey.step === 3}
				<div class="btn btn-xs btn-neutral" on:click={updateStage}>Accepted Offer</div>
			{:else if journey.step === 4}
				<div class="btn btn-xs btn-primary" on:click={updateStage}>Closing</div>
			{:else if journey.step === 5}
				<div class="btn btn-xs btn-accent" on:click={updateStage}>Closed</div>
			{/if}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 scale-75 -rotate-12"
			>
				<path
					fill-rule="evenodd"
					d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 8a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 8zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 8zm-6.828 2.828a.75.75 0 010 1.061L6.11 12.95a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm3.594-3.317a.75.75 0 00-1.37.364l-.492 6.861a.75.75 0 001.204.65l1.043-.799.985 3.678a.75.75 0 001.45-.388l-.978-3.646 1.292.204a.75.75 0 00.74-1.16l-3.874-5.764z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>

		<h2>
			{journey.expand.client.fname}
			{journey.expand.client.lname}
		</h2>

		<div class="divider" />

		<div class="flex flex-row gap-1">
			<div>
				<SearchProfile {journey} />
			</div>
			<br />
			<div>
				<OfferCheatSheet {journey} />
			</div>
		</div>

		<div>
			<div class="flex flex-row justify-between items-end">
				<h4>Files</h4>
				<UploadFile {journey} />
			</div>
			<Files files={filteredFiles} />
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
