<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	export let journey;

	let cheatsheetPromise;
	let cheatsheet;
	let buyerName;
	let address;
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
	let condo;
	let condoFee;
	let parking;
	let storageUnit;
	let cheatsheetForm;

	if ($currentUser.isAgent) {
		buyerName = `${journey.expand.client.fname} ${journey.expand.client.lname}`;
	} else {
		buyerName = `${$currentUser.fname} ${$currentUser.lname}`;
	}

	$: data = {
		journey: journey.id,
		buyerName: buyerName,
		address: address,
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
			address = result.address;
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
			cheatsheetForm.close();
			return;
		}

		cheatsheet = await pb.collection('cheatsheets').create(data);
		cheatsheetForm.close();
	}
</script>

<span class="btn btn-primary w-full" onclick="oc{journey.id}.showModal()"
	>Offer Cheatsheet</span
>
<dialog bind:this={cheatsheetForm} id="oc{journey.id}" class="modal modal-bottom sm:modal-middle">
	<form
		method="dialog"
		class="modal-box space-y-3 overflow-y-auto prose"
		on:submit|preventDefault={setOfferCheatSheet}
	>
		<span
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			onclick="oc{journey.id}.close()">✕</span
		>
		<h3>Offer Cheatsheet</h3>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="buyerName">
				<span class="label-text">Buyer's name</span>
			</label>
			<input
				bind:value={buyerName}
				type="text"
				name="buyerName"
				class="input input-bordered"
				required
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="address">
				<span class="label-text">Address</span>
			</label>
			<input bind:value={address} type="text" name="address" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="purchasePrice">
				<span class="label-text">Purchase price</span>
			</label>
			<input
				bind:value={purchasePrice}
				type="text"
				name="purchasePrice"
				class="input input-bordered"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="earnestMoney">
				<span class="label-text">Earnest money</span>
			</label>
			<input
				bind:value={earnestMoney}
				type="text"
				name="earnestMoney"
				class="input input-bordered"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="inclusions">
				<span class="label-text">Inclusions</span>
			</label>
			<input bind:value={inclusions} type="text" name="inclusions" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="exclusions">
				<span class="label-text">Exclusions</span>
			</label>
			<input bind:value={exclusions} type="text" name="exclusions" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="bindingAcceptance">
				<span class="label-text">Binding Acceptance</span>
			</label>
			<input
				bind:value={bindingAcceptance}
				type="date"
				name="bindingAcceptance"
				class="input input-bordered"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="closingDate">
				<span class="label-text">Closing date</span>
			</label>
			<input bind:value={closingDate} type="date" name="closingDate" class="input input-bordered" />
		</div>

		<div class="divider" />

		<div class="form-control w-full max-w-xs">
			<label class="label" for="financingContingency">
				<span class="label-text">Financing Contingency</span>
			</label>
			<input
				bind:checked={financingContingency}
				type="checkbox"
				name="financingContingency"
				class="checkbox"
			/>
		</div>

		{#if financingContingency}
			<div class="form-control w-full max-w-xs">
				<label class="label" for="loanType">
					<span class="label-text">Loan Type </span>
				</label>
				<input type="text" bind:value={loanType} name="loanType" class="input input-bordered" />

				<label class="label" for="downPayment">
					<span class="label-text">Down Payment </span>
				</label>
				<input
					type="text"
					bind:value={downPayment}
					name="downPayment"
					class="input input-bordered"
				/>

				<label class="label" for="interestRate">
					<span class="label-text">Interest Rate </span>
				</label>
				<input
					type="text"
					bind:value={interestRate}
					name="interestRate"
					class="input input-bordered"
				/>
			</div>
		{/if}

		<div class="divider" />

		<div class="form-control w-full max-w-xs">
			<label class="label" for="appraisalContingency">
				<span class="label-text">Appraisal Contingency</span>
			</label>
			<input
				bind:checked={appraisalContingency}
				type="checkbox"
				name="appraisalContingency"
				class="checkbox"
			/>
		</div>

		<div class="divider" />

		<div class="form-control w-full max-w-xs">
			<label class="label" for="inspectionContingency">
				<span class="label-text">Inspection Contingency</span>
			</label>
			<input
				bind:checked={inspectionContingency}
				type="checkbox"
				name="inspectionContingency"
				class="checkbox"
			/>
		</div>

		{#if inspectionContingency}
			<div class="form-control w-full max-w-xs">
				<label class="label" for="rightToCure">
					<span class="label-text">Right to Cure</span>
				</label>
				<input bind:checked={rightToCure} type="checkbox" name="rightToCure" class="checkbox" />
				<label class="label" for="radonTest">
					<span class="label-text">Radon Test</span>
				</label>
				<input bind:checked={radonTest} type="checkbox" name="radonTest" class="checkbox" />
			</div>
		{/if}

		<div class="divider" />

		<div class="form-control w-full max-w-xs">
			<label class="label" for="sellerClosingCostCredit">
				<span class="label-text">Seller Closing Cost Credit</span>
			</label>
			<input
				bind:value={sellerClosingCostCredit}
				type="text"
				name="sellerClosingCostCredit"
				class="input input-bordered"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="homeWarranty">
				<span class="label-text">Home Warranty</span>
			</label>
			<input bind:checked={homeWarranty} type="checkbox" name="homeWarranty" class="checkbox" />
		</div>

		<div class="divider" />

		<div class="form-control w-full max-w-xs">
			<label class="label" for="condo">
				<span class="label-text">Condo</span>
			</label>
			<input bind:checked={condo} type="checkbox" name="condo" class="checkbox" />
		</div>

		{#if condo}
			<div class="form-control w-full max-w-xs">
				<label class="label" for="condoFee">
					<span class="label-text">Fee per month</span>
				</label>
				<input bind:value={condoFee} type="text" name="condoFee" class="input input-bordered" />

				<label class="label" for="parking">
					<span class="label-text">Parking</span>
				</label>
				<input bind:value={parking} type="text" name="parking" class="input input-bordered" />

				<label class="label" for="storageUnit">
					<span class="label-text">Storage unit</span>
				</label>
				<input
					bind:value={storageUnit}
					type="text"
					name="storageUnit"
					class="input input-bordered"
				/>
			</div>
		{/if}

		<div class="divider" />

		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<span class="btn btn-secondary btn-outline" onclick="oc{journey.id}.close()">Cancel</span>
			<button class="btn btn-primary" type="submit"> Save </button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
