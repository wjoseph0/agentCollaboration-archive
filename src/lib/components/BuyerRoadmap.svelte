<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';

	let journey;
	let agent;
	let client;

	$: if ($currentUser.isAgent) {
		agent = $currentUser.id;
		client = $currentUser.focusedClient;
	} else {
		agent = $currentUser.agent;
		client = $currentUser.id;
	}

	const scrollToCurrentStep = () => {
		const el = document.getElementById('currentStep');
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth' });
	};

	const updateStep = async (stepID) => {
		const data = {
			step: stepID
		};

		await pb.collection('journeys').update(journey.id, data);
	};

	onMount(async () => {
		journey = await pb
			.collection('journeys')
			.getFirstListItem(`agent='${agent}' && client='${client}'`);

		// Subscribe to changes only in the specified record
		await pb.collection('journeys').subscribe(journey.id, async (e) => {
			journey = e.record;
		});

		scrollToCurrentStep();
	});

	onDestroy(() => {
		pb.collection('journeys').unsubscribe();
	});

	const steps = [
		{
			id: 1,
			name: 'Form Agency',
			phase: 1
		},
		{
			id: 2,
			name: 'Mortgage Pre-Approval',
			phase: 1
		},
		{
			id: 3,
			name: 'Preview Homes',
			phase: 2
		},
		{
			id: 4,
			name: 'Make Offer',
			phase: 2
		},
		{
			id: 5,
			name: 'Accepted Offer',
			phase: 3
		},
		{
			id: 6,
			name: 'Contingencies',
			phase: 3
		},
		{
			id: 7,
			name: 'Final Walk-Through',
			phase: 3
		},
		{
			id: 8,
			name: 'Closing Day',
			phase: 3
		}
	];
</script>

{#if journey}
	<ul class="steps">
		<li class="step step-primary">Prepare</li>
		<li class="step step-primary">Search</li>
		<li class="step">Close</li>
	</ul>

	<div class="h-96 carousel carousel-vertical rounded-box mt-9">
		{#each steps as step}
			<div class="carousel-item h-full bg-primary flex flex-col items-center m-1 p-4">
				{#if step.id == journey.step}
					<div class="badge" id="currentStep">Current Step</div>
				{/if}
				<div class="stat bg-white flex flex-col items-center h-2/3">
					<!-- <div class="stat-title">Step</div> -->
					<div class="stat-value">{step.name}</div>
					<div class="stat-actions">
						<button class="btn btn-sm btn-success">Add funds</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<!-- 	{#each buyerPhases as phase}
		{#if phase[0].completeNumber < journey.step}
			<details>
				<summary>
					<i class="bi bi-check-circle-fill" id="checkmark" />
					<i class={phase[0].icon} />
					<strong>{phase[0].name}</strong>
				</summary>
			</details>
		{:else if phase[0].numbers.includes(journey.step)}
			<details id="open" open>
				<summary> <strong>{phase[0].name}</strong> </summary>
				{#each phase[0].steps as step}
					{#if step[0].number == journey.step}
						<details id="openStep" open>
							<summary>
								<i class={step[0].icon} />
								{step[0].name}
							</summary>

							{#if step[0].number == 3}
								<SearchProfile {journey} />
							{/if}

							{#if step[0].number == 4}
								<OfferCheatSheet {journey} />
							{/if}
						</details>
					{:else if step[0].number < journey.step}
						<details class="completed">
							<summary>
								<i class="bi bi-check-circle-fill" id="checkmark" />
								<i class={step[0].icon} />
								{step[0].name}
							</summary>

							{#if step[0].number == 3}
								<SearchProfile {journey} />
							{/if}
						</details>
					{:else}
						<details class="future">
							<summary>
								<i class={step[0].icon} />
								{step[0].name}
							</summary>
							{#if step[0].number == 4}
								<OfferCheatSheet {journey} />
							{/if}
						</details>
					{/if}
				{/each}
			</details>
		{:else if phase[0].completeNumber > journey.step}
			<details class="future">
				<summary> <strong>{phase[0].name}</strong> </summary>
			</details>
		{/if}
	{/each} -->

	<!-- {#if $currentUser.isAgent}
		<div>
			{#if journey.step > 1}
				<button on:click={moveBackward(journey)} class="btn btn-secondary rounded-lg">
					Move back
				</button>
			{/if}
			{#if journey.step < 8}
				<button on:click={moveForward(journey)} class="btn btn-primary rounded-lg"
					>Move forward</button
				>
			{/if}
		</div>
	{/if} -->
{/if}

<style>
	/* 	div {
		display: flex;
	}

	#checkmark {
		color: lightgreen;
	}

	details {
		border-bottom: none;
	}

	details[open] > summary {
		color: inherit;
	}

	details summary:focus {
		color: inherit;
	}

	#open {
		border: #1095c1 2px solid;
		padding: 1.5em 1em 1.5em 1em;
		border-radius: 1em;
	}

	#open > summary {
		font-size: 1.6em;
		color: inherit;
		padding-bottom: 2rem;
	}

	#openStep {
		border-bottom: #1095c1 2px solid;
	}

	.completed {
		font-size: small;
	}

	.future {
		font-size: small;
	} */
</style>
