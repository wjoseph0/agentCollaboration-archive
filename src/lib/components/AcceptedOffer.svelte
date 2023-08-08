<script>
	export let journey;

	let aoForm;
	let earnestMoneyDeposit;
</script>

<span class="btn btn-block btn-neutral btn-outline" onclick="ao{journey.id}.showModal()">
	Accepted Offer
</span>
<dialog bind:this={aoForm} id="ao{journey.id}" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box space-y-3 overflow-y-auto prose">
		<span
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			onclick="ao{journey.id}.close()">✕</span
		>
		<h3>Accepted Offer Deadlines</h3>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="earnestMoneyDeposit">
				<span class="label-text">Earnest Money</span>
			</label>
			<input
				bind:value={earnestMoneyDeposit}
				type="date"
				name="earnestMoneyDeposit"
				class="input input-bordered"
			/>
		</div>

		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-primary" type="submit"> Save </button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
