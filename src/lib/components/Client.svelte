<script>
	import { pb } from '$lib/pocketbase';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import FilesTable from '$lib/components/FilesTable.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import Deadlines from '$lib/components/Deadlines.svelte';
	export let loading;
	export let journey;
	export let deadlines;
	export let files;

	$: filteredFiles = files.filter((file) => file.client === journey.client);
	$: filteredDeadlines = deadlines.filter((deadline) => deadline.journey === journey.id);

	let clientOrCustomerSelector;

	const setClientOrCustomer = async (bool) => {
		await pb.collection('users').update(journey.client, { isClient: bool });
	};
</script>

<dialog id="c{journey.id}" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<div class="flex flex-row items-center">
			<select
				bind:this={clientOrCustomerSelector}
				class="select select-sm max-w-xs"
				on:change={() => {
					setClientOrCustomer(clientOrCustomerSelector.value);
				}}
			>
				{#if journey.expand.client.isClient}
					<option value="false">Customer</option>
					<option value="true" selected>Client</option>
				{:else}
					<option value="false" selected>Customer</option>
					<option value="true">Client</option>
				{/if}
			</select>
		</div>

		<h2 class="my-12">
			{journey.expand.client.fname}
			{journey.expand.client.lname}
		</h2>

		<div>
			<Deadlines {journey} deadlines={filteredDeadlines} {loading} />
		</div>

		<div class="mb-12">
			<OfferCheatSheet {journey} />
		</div>

		<div>
			<div class="flex flex-row items-center justify-between items-end">
				<h4 class="my-0">Files</h4>
				<UploadFile {journey} />
			</div>
			<FilesTable files={filteredFiles} {loading} />
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
