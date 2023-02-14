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
			<h2>({counter()})</h2>
			<h3>{step}</h3>
		</div>
	{/each}
</section>

<style>
	h2,
	h3 {
		text-align: center;
	}

	h2 {
		border-radius: 99rem;
		border-color: #fff;
		border-width: 2px;
	}

	div {
		height: 50vh;
	}
</style>
