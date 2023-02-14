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

<section id="stepContainer">
	{#each buyerSteps as step}
		<section class="step">
			<h3>{counter()} {step}</h3>
		</section>
	{/each}
</section>

<style>
	div:nth-child(even) {
		text-align: right;
	}

	#stepContainer {
		background: rgb(246, 250, 223);
		background: linear-gradient(
			180deg,
			rgba(246, 250, 223, 1) 0%,
			rgba(120, 236, 108, 1) 100%
		);
	}

	.step {
		height: 45vh;
		/* padding: 0 1rem 0 1rem; */
	}
</style>
