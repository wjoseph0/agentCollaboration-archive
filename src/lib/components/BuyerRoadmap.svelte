<script>
	let buyerSteps = [
		'Establish Agency Relationship',
		'Mortgage Pre-Approval',
		'Preview Homes',
		'Make Offer',
		'Accepted Offer',
		'Contingencies',
		'Final Walk-Through',
		'Closing Day'
	];

	let count = 0;
	function counter() {
		count++;
		return count;
	}
</script>

<section>
	{#each buyerSteps as step}
		<div>
			<h3>{counter()}. {step}</h3>
		</div>
	{/each}
</section>

<style>
	div:nth-child(even) {
		text-align: right;
	}
</style>
