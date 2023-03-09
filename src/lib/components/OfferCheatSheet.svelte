<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	export let journey;
	let cheatsheet;

	let buyerName;
	let purchasePrice;
	let earnestMoney;
	let inclusions;
	let exclusions;
	let bindingAcceptance;
	let closingDate;
	let financingContingency;
	let appraisalContingency;
	let inspectionContingency;
	let rightToCure;
	let radonTest;
	let sellerClosingCostCredit;
	let homeWarranty;
	let condoFee;
	let parking;
	let storageUnit;

	if ($currentUser.isAgent) {
		buyerName = `${$currentUser.expand.focusedClient.fname} ${$currentUser.expand.focusedClient.lname}`;
	} else {
		buyerName = `${$currentUser.fname} ${$currentUser.lname}`;
	}

	onMount(async () => {
		cheatsheet = await pb
			.collection('cheatsheets')
			.getFirstListItem(`journey='${journey.id}'`);

		if (cheatsheet) {
			buyerName = cheatsheet.buyerName;
			purchasePrice = cheatsheet.purchasePrice;
			earnestMoney = cheatsheet.earnestMoney;
			inclusions = cheatsheet.inclusions;
			exclusions = cheatsheet.exclusions;
			bindingAcceptance = cheatsheet.bindingAcceptance;
			closingDate = cheatsheet.closingDate;
			financingContingency = cheatsheet.financingContingency;
			appraisalContingency = cheatsheet.appraisalContingency;
			inspectionContingency = cheatsheet.inspectionContingency;
			rightToCure = cheatsheet.rightToCure;
			radonTest = cheatsheet.radonTest;
			sellerClosingCostCredit = cheatsheet.sellerClosingCostCredit;
			homeWarranty = cheatsheet.homeWarranty;
			condoFee = cheatsheet.condoFee;
			parking = cheatsheet.parking;
			storageUnit = cheatsheet.storageUnit;
		}
	});

	async function updateCheatSheet() {
		const data = {
			journey: journey.id,
			buyerName: buyerName,
			purchasePrice: purchasePrice,
			earnestMoney: earnestMoney,
			inclusions: inclusions,
			exclusions: exclusions,
			bindingAcceptance: bindingAcceptance,
			closingDate: closingDate,
			financingContingency: financingContingency,
			appraisalContingency: appraisalContingency,
			inspectionContingency: inspectionContingency,
			rightToCure: rightToCure,
			radonTest: radonTest,
			sellerClosingCostCredit: sellerClosingCostCredit,
			homeWarranty: homeWarranty,
			condoFee: condoFee,
			parking: parking,
			storageUnit: storageUnit
		};

		cheatsheet = await pb.collection('cheatsheets').update(cheatsheet.id, data);
		toggleModal();
	}

	async function submitNewOffer(journey) {
		const data = {
			journey: journey.id,
			buyerName: buyerName,
			purchasePrice: purchasePrice,
			earnestMoney: earnestMoney,
			inclusions: inclusions,
			exclusions: exclusions,
			bindingAcceptance: bindingAcceptance,
			closingDate: closingDate,
			financingContingency: financingContingency,
			appraisalContingency: appraisalContingency,
			inspectionContingency: inspectionContingency,
			rightToCure: rightToCure,
			radonTest: radonTest,
			sellerClosingCostCredit: sellerClosingCostCredit,
			homeWarranty: homeWarranty,
			condoFee: condoFee,
			parking: parking,
			storageUnit: storageUnit
		};

		cheatsheet = await pb.collection('cheatsheets').create(data);
		toggleModal();
	}

	let modalVisible = false;

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}
</script>

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="#top"
				aria-label="Close"
				class="close"
				data-target="modal-example"
				on:click={toggleModal}
			/>
			<h1>Offer to Purchase</h1>
			<form>
				<label>
					Buyer's name, including middle initial (when applicable)
					<input bind:value={buyerName} type="text" />
				</label>

				<label>
					Purchase price
					<input bind:value={purchasePrice} type="text" />
				</label>

				<label>
					Earnest money
					<input bind:value={earnestMoney} type="text" />
				</label>

				<label>
					Inclusions
					<input bind:value={inclusions} type="text" />
				</label>

				<label>
					Exclusions
					<input bind:value={exclusions} type="text" />
				</label>

				<label>
					Binding Acceptance
					<input bind:value={bindingAcceptance} type="date" />
				</label>

				<label>
					Closing date
					<input bind:value={closingDate} type="date" />
				</label>

				<label>
					Financing Contingency
					<input bind:checked={financingContingency} type="checkbox" />
				</label>

				<label>
					Appraisal Contingency
					<input bind:checked={appraisalContingency} type="checkbox" />
				</label>

				<label>
					Inspection Contingency
					<input bind:checked={inspectionContingency} type="checkbox" />
					<label
						>Right to Cure <input
							bind:checked={rightToCure}
							type="checkbox"
						/></label
					>
					<label
						>Radon Test <input
							bind:checked={radonTest}
							type="checkbox"
						/></label
					>
				</label>

				<label id="sellerCredit">
					Seller Closing Cost Credit
					<input bind:value={sellerClosingCostCredit} type="text" />
				</label>

				<label>
					Home Warranty?
					<input bind:checked={homeWarranty} type="checkbox" />
				</label>

				<details>
					<summary>Condo?</summary>
					<label>
						Fee per month
						<input bind:value={condoFee} type="text" />
					</label>

					<label>
						Parking
						<input bind:value={parking} type="text" />
					</label>

					<label>
						Storage unit
						<input bind:value={storageUnit} type="text" />
					</label>
				</details>
			</form>
			<footer>
				<a href="#top" role="button" class="secondary" on:click={toggleModal}>
					Cancel
				</a>
				{#if cheatsheet}
					<a href="#top" role="button" on:click={updateCheatSheet}>Update</a>
				{:else}
					<a href="#top" role="button" on:click={submitNewOffer(journey)}
						>Submit</a
					>
				{/if}
			</footer>
		</article>
	</dialog>
{:else if cheatsheet}
	<a href="#top" on:click={toggleModal}>View cheat sheet</a>
{:else}
	<a href="#top" on:click={toggleModal}>Fill out cheat sheet</a>
{/if}

<style>
	#sellerCredit {
		padding-top: 1em;
	}

	details {
		padding-top: 2em;
	}
</style>
