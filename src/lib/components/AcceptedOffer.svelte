<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	export let journey;

	let acceptedOffer;
	let earnest_money;
	let inspection;
	let appraisal;
	let financing;
	let aoForm;

	$: data = {
		journey: journey.id,
		earnest_money: earnest_money,
		inspection: inspection,
		appraisal: appraisal,
		financing: financing
	};

	onMount(async () => {
		acceptedOffer = await pb
			.collection('accepted_offers')
			.getFirstListItem(`journey='${journey.id}'`);

		earnest_money = acceptedOffer.earnest_money?.substring(0, 10);
		inspection = acceptedOffer.inspection?.substring(0, 10);
		appraisal = acceptedOffer.appraisal?.substring(0, 10);
		financing = acceptedOffer.financing?.substring(0, 10);
	});

	async function setAO() {
		if (acceptedOffer) {
			acceptedOffer = await pb.collection('accepted_offers').update(acceptedOffer.id, data);
			aoForm.close();
			return;
		}
		acceptedOffer = await pb.collection('accepted_offers').create(data);
		aoForm.close();
	}
</script>

<span class="btn btn-block btn-neutral btn-outline" onclick="ao{journey.id}.showModal()">
	Deadlines
</span>

<dialog bind:this={aoForm} id="ao{journey.id}" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box space-y-3 overflow-y-auto prose">
		<span
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			onclick="ao{journey.id}.close()">✕</span
		>
		<h3>Accepted Offer</h3>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="earnest_money">
				<span class="label-text">Earnest Money Deadline</span>
			</label>
			{#if !$currentUser.isAgent}
				<input
					bind:value={earnest_money}
					type="date"
					name="earnest_money"
					class="input input-bordered"
					disabled
				/>
			{:else}
				<input
					bind:value={earnest_money}
					type="date"
					name="earnest_money"
					class="input input-bordered"
				/>
			{/if}
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="inspection">
				<span class="label-text">Inspection Deadline</span>
			</label>
			{#if !$currentUser.isAgent}
				<input
					bind:value={inspection}
					type="date"
					name="inspection"
					class="input input-bordered"
					disabled
				/>
			{:else}
				<input bind:value={inspection} type="date" name="inspection" class="input input-bordered" />
			{/if}
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="appraisal">
				<span class="label-text">Appraisal Deadline</span>
			</label>
			{#if !$currentUser.isAgent}
				<input
					bind:value={appraisal}
					type="date"
					name="appraisal"
					class="input input-bordered"
					disabled
				/>
			{:else}
				<input bind:value={appraisal} type="date" name="appraisal" class="input input-bordered" />
			{/if}
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="financing">
				<span class="label-text">Loan Commitment Deadline</span>
			</label>
			{#if !$currentUser.isAgent}
				<input
					bind:value={financing}
					type="date"
					name="financing"
					class="input input-bordered"
					disabled
				/>
			{:else}
				<input bind:value={financing} type="date" name="financing" class="input input-bordered" />
			{/if}
		</div>

		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if $currentUser.isAgent}
				<span
					class="btn btn-primary"
					on:click={() => {
						setAO();
					}}
				>
					Save
				</span>
			{/if}
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
