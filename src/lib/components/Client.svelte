<script>
	import { pb } from '$lib/pocketbase';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';
	import Files from './Files.svelte';
	import UploadFile from './UploadFile.svelte';
	import AcceptedOffer from './AcceptedOffer.svelte';
	import BuyerConsultation from './BuyerConsultation.svelte';

	export let journey;
	export let files;

	let stageSelector;
	let clientStatusSelector;

	$: filteredFiles = files.filter((file) => file.client === journey.client);

	const updateStage = async (num) => {
		await pb.collection('journeys').update(journey.id, { step: num });
	};

	const updateClientStatus = async (bool) => {
		await pb.collection('users').update(journey.client, { isClient: bool });
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{journey.id}" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex flex-row items-center">
			{#if journey.step === 1}
				<span class="badge badge-ghost badge-lg" />
			{:else if journey.step === 2}
				<span class="badge badge-secondary badge-lg" />
			{:else if journey.step === 3}
				<span class="badge badge-neutral badge-lg" />
			{:else if journey.step === 4}
				<span class="badge badge-primary badge-lg" />
			{:else if journey.step === 5}
				<span class="badge badge-success badge-lg" />
			{/if}
			<select
				bind:this={stageSelector}
				class="select select-sm max-w-xs"
				on:change={() => {
					updateStage(stageSelector.value);
				}}
			>
				{#if journey.step === 1}
					<option value="1" selected> Preparation </option>
				{:else}
					<option value="1"> Preparation </option>
				{/if}
				{#if journey.step === 2}
					<option value="2" selected>Searching</option>
				{:else}
					<option value="2">Searching</option>
				{/if}
				{#if journey.step === 3}
					<option value="3" selected>Accepted Offer</option>
				{:else}
					<option value="3">Accepted Offer</option>
				{/if}
				{#if journey.step === 4}
					<option value="4" selected>Closing</option>
				{:else}
					<option value="4">Closing</option>
				{/if}
				{#if journey.step === 5}
					<option value="5" selected>Closed</option>
				{:else}
					<option value="5">Closed</option>
				{/if}
			</select>

			<select
				bind:this={clientStatusSelector}
				class="select select-sm max-w-xs"
				on:change={() => {
					updateClientStatus(clientStatusSelector.value);
				}}
			>
				{#if !journey.expand.client.isClient}
					<option value="false" selected>Customer</option>
				{:else}
					<option value="false">Customer</option>
				{/if}
				{#if journey.expand.client.isClient}
					<option value="true" selected>Client</option>
				{:else}
					<option value="true">Client</option>
				{/if}
			</select>
		</div>

		<h2>
			{journey.expand.client.fname}
			{journey.expand.client.lname}
		</h2>

		<div class="divider" />

		{#if journey.step === 1}
			<BuyerConsultation {journey} />
		{:else if journey.step === 2}
			<div class="flex flex-row gap-1">
				<div class="w-1/2">
					<SearchProfile {journey} />
				</div>

				<div class="w-1/2">
					<OfferCheatSheet {journey} />
				</div>
			</div>
		{:else if journey.step === 3}
			<AcceptedOffer {journey} />
		{/if}

		<div class="divider" />

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
