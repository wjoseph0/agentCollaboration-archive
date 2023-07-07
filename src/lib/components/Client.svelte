<script>
	import { pb } from '$lib/pocketbase';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';
	import Files from './Files.svelte';

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

		{#if journey.step === 1}
			<div class="btn btn-neutral" on:click={updateStage}>Preparation</div>
		{:else if journey.step === 2}
			<div class="btn btn-secondary" on:click={updateStage}>Searching</div>
		{:else if journey.step === 3}
			<div class="btn btn-primary" on:click={updateStage}>Closing</div>
		{:else if journey.step === 4}
			<div class="btn btn-accent" on:click={updateStage}>Closed</div>
		{/if}

		<h2>
			{journey.expand.client.fname}
			{journey.expand.client.lname}
		</h2>

		<div class="divider" />

		<div class="prose">
			<SearchProfile {journey} />
		</div>
		<br />
		<div>
			<OfferCheatSheet {journey} />
		</div>

		<div>
			<h4>Files</h4>
			<Files files={filteredFiles} />
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
