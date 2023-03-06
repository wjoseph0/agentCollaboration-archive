<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let journey = 'loading';
	let agent;
	let client;

	if ($currentUser.isAgent) {
		agent = $currentUser.id;
		client = $currentUser.focusedClient;
	} else {
		agent = $currentUser.agent;
		client = $currentUser.id;
	}

	onMount(async () => {
		journey = await pb
			.collection('journeys')
			.getFirstListItem(`agent='${agent}' && client='${client}'`);
	});

	let buyerSteps = [
		['1', 'Form Agency', 'bi bi-people-fill'],
		['2', 'Mortgage Pre-Approval', 'bi bi-hand-thumbs-up-fill'],
		['3', 'Preview Homes', 'bi bi-search-heart-fill'],
		['4', 'Make Offer', 'bi bi-envelope-paper-fill'],
		['5', 'Accepted Offer', 'bi bi-envelope-paper-heart-fill'],
		['6', 'Contingencies', 'bi bi-list-ol'],
		['7', 'Final Walk-Through', 'bi bi-arrow-through-heart-fill'],
		['8', 'Closing Day', 'bi bi-key-fill']
	];
</script>

{#if journey == 'loading'}
	<div aria-busy="true" />
{:else}
	{#each buyerSteps as step}
		{#if step[0] < journey.step}
			<details>
				<summary>
					<i class="bi bi-check-circle-fill" id="checkmark" />
					<i class={step[2]} />
					{step[1]}
				</summary>
			</details>
		{:else if step[0] == journey.step}
			<details id="open" open>
				<summary><i class={step[2]} /> {step[1]} </summary>
			</details>
		{:else if step[0] > journey.step}
			<details class="future">
				<summary><i class={step[2]} /> {step[1]} </summary>
			</details>
		{/if}
	{/each}
{/if}

<style>
	#checkmark {
		color: lightgreen;
	}

	details[open] > summary {
		color: inherit;
	}

	details summary:focus {
		color: inherit;
	}

	#open {
		border-bottom: #1095c1 3px solid;
		border-radius: 0.5em;
	}

	#open > summary {
		font-size: 1.6em;
		color: inherit;
	}

	.future {
		opacity: 0.2;
	}

	.future[open] {
		opacity: 1;
	}
</style>
