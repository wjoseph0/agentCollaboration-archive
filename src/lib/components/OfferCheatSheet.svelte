<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	export let journey;

	let cheatsheetPromise;
	let cheatsheet;
	let buyerName;
	let purchasePrice;
	let earnestMoney;
	let inclusions;
	let exclusions;
	let bindingAcceptance;
	let closingDate;
	let financingContingency;
	let loanType;
	let downPayment;
	let interestRate;
	let appraisalContingency;
	let inspectionContingency;
	let rightToCure;
	let radonTest;
	let sellerClosingCostCredit;
	let homeWarranty;
	let condoFee;
	let parking;
	let storageUnit;
	let modalVisible = false;

	if ($currentUser.isAgent) {
		buyerName = `${$currentUser.expand.focusedClient.fname} ${$currentUser.expand.focusedClient.lname}`;
	} else {
		buyerName = `${$currentUser.fname} ${$currentUser.lname}`;
	}

	$: data = {
		journey: journey.id,
		buyerName: buyerName,
		purchasePrice: purchasePrice,
		earnestMoney: earnestMoney,
		inclusions: inclusions,
		exclusions: exclusions,
		bindingAcceptance: bindingAcceptance,
		closingDate: closingDate,
		financingContingency: financingContingency,
		loanType: loanType,
		downPayment: downPayment,
		interestRate: interestRate,
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

	onMount(() => {
		cheatsheetPromise = pb.collection('cheatsheets').getFirstListItem(`journey='${journey.id}'`);

		cheatsheetPromise.then((result) => {
			cheatsheet = result;
			buyerName = result.buyerName;
			purchasePrice = result.purchasePrice;
			earnestMoney = result.earnestMoney;
			inclusions = result.inclusions;
			exclusions = result.exclusions;
			bindingAcceptance = result.bindingAcceptance?.substring(0, 10);
			closingDate = result.closingDate?.substring(0, 10);
			financingContingency = result.financingContingency;
			loanType = result.loanType;
			downPayment = result.downPayment;
			interestRate = result.interestRate;
			appraisalContingency = result.appraisalContingency;
			inspectionContingency = result.inspectionContingency;
			rightToCure = result.rightToCure;
			radonTest = result.radonTest;
			sellerClosingCostCredit = result.sellerClosingCostCredit;
			homeWarranty = result.homeWarranty;
			condoFee = result.condoFee;
			parking = result.parking;
			storageUnit = result.storageUnit;
		});
	});

	async function setOfferCheatSheet() {
		if (cheatsheet) {
			cheatsheet = await pb.collection('cheatsheets').update(cheatsheet.id, data);
			toggleModal();
			return;
		}

		cheatsheet = await pb.collection('cheatsheets').create(data);
		toggleModal();
	}

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}
</script>

<div class="container">
	{#if cheatsheet}
		<a href="#top" on:click={toggleModal}>View cheat sheet</a>
	{:else}
		{#await cheatsheetPromise}
			<!-- svelte-ignore a11y-missing-content -->
			<a href="#top" aria-busy="true" />
		{:then}
			<a href="#top" on:click={toggleModal}>View cheat sheet</a>
		{:catch}
			<a href="#top" on:click={toggleModal}>Fill out cheat sheet</a>
		{/await}
	{/if}
</div>

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
					Buyer's name
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

				{#if financingContingency}
					<label>Loan Type <input type="text" bind:value={loanType} /></label>
					<label>Down Payment <input type="text" bind:value={downPayment} /></label>
					<label>Interest Rate <input type="text" bind:value={interestRate} /></label>
				{/if}

				<label>
					Appraisal Contingency
					<input bind:checked={appraisalContingency} type="checkbox" />
				</label>

				<label>
					Inspection Contingency
					<input bind:checked={inspectionContingency} type="checkbox" />
				</label>

				{#if inspectionContingency}
					<label>Right to Cure <input bind:checked={rightToCure} type="checkbox" /></label>
					<label>Radon Test <input bind:checked={radonTest} type="checkbox" /></label>
				{/if}

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
				<a href="#top" role="button" class="secondary" on:click={toggleModal}> Cancel </a>
				{#if cheatsheet}
					<a href="#top" role="button" on:click={setOfferCheatSheet}>Update</a>
				{:else}
					<a href="#top" role="button" on:click={setOfferCheatSheet}>Submit</a>
				{/if}
			</footer>
		</article>
	</dialog>
{/if}

<style>
	.container {
		padding-top: 0.5em;
	}

	#sellerCredit {
		padding-top: 1em;
	}

	details {
		padding-top: 2em;
	}
</style>
