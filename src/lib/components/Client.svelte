<script>
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';
	import Files from './Files.svelte';

	export let journey;
	export let files;

	$: filteredFiles = files.filter((file) => file.client === journey.client);
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="{journey.expand.client.fname}Modal" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<h2 class="">
			{journey.expand.client.fname}
			{journey.expand.client.lname}
			{#if journey.step === 1}
				<div class="badge badge-neutral">Preparation</div>
			{:else if journey.step === 2}
				<div class="badge badge-secondary">Searching</div>
			{:else if journey.step === 3}
				<div class="badge badge-primary">Closing</div>
			{:else if journey.step === 4}
				<div class="badge badge-accent">Closed</div>
			{/if}
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
