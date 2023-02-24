<script>
	let buyerSteps = [
		['Establish Agency Relationship', 'bi bi-people-fill'],
		['Mortgage Pre-Approval', 'bi bi-hand-thumbs-up-fill'],
		['Preview Homes', 'bi bi-search-heart-fill'],
		['Make Offer', 'bi bi-envelope-paper-fill'],
		['Accepted Offer', 'bi bi-envelope-paper-heart-fill'],
		['Contingencies', 'bi bi-list-ol'],
		['Final Walk-Through', 'bi bi-arrow-through-heart-fill'],
		['Closing Day', 'bi bi-key-fill']
	];
</script>

<section>
	{#each buyerSteps as step}
		<div class="step">
			<div>{step[0]}</div>
			<i class={step[1]} />
		</div>
	{/each}
</section>

<style>
	i {
		font-size: 6rem;
	}

	section {
		margin-top: 5em;
	}

	.step {
		margin-bottom: 5em;
		text-align: center;
	}

	.step:nth-child(1) {
		color: lightgreen;
	}
</style>
