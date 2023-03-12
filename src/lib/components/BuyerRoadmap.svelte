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

	async function moveBackward(journey) {
		const data = {
			step: journey.step - 1
		};

		await pb.collection('journeys').update(journey.id, data);
	}

	async function moveForward(journey) {
		const data = {
			step: journey.step + 1
		};

		await pb.collection('journeys').update(journey.id, data);
	}

	$: onMount(async () => {
		journey = await pb
			.collection('journeys')
			.getFirstListItem(`agent='${agent}' && client='${client}'`);

		// Subscribe to changes only in the specified record
		await pb.collection('journeys').subscribe(journey.id, async (e) => {
			journey = e.record;
		});
	});

	onDestroy(() => {
		pb.collection('journeys').unsubscribe();
	});

	let buyerPhases = [
		[
			{
				numbers: [1, 2],
				completeNumber: '2',
				name: 'Preparing Phase',
				steps: [
					[
						{
							number: '1',
							name: 'Form Agency',
							icon: 'bi bi-people-fill',
							desc: 'This is where you will officially hire your real estate agent to represent you during your journey.',
							link: 'https://study.com/learn/lesson/real-estate-agency-overview-types.html'
						}
					],
					[
						{
							number: '2',
							name: 'Mortgage Pre-Approval',
							icon: 'bi bi-hand-thumbs-up-fill',
							desc: '*Getting pre-approved for a mortgage lets you know how much money you can borrow, the range of interest rates you qualify for and the different mortgage options available to you.*',
							link: 'https://www.zillow.com/mortgage-learning/pre-approval/'
						}
					]
				]
			}
		],

		[
			{
				numbers: [3, 4],
				completeNumber: '4',
				name: 'Searching Phase',
				steps: [
					[
						{
							number: '3',
							name: 'Preview Homes',
							icon: 'bi bi-search-heart-fill',
							desc: 'This is where you will start to tour homes and make offers on the ones you like!',
							link: 'https://www.realtor.com/advice/buy/the-basics-of-making-an-offer-on-a-house/'
						}
					],
					[
						{
							number: '4',
							name: 'Make Offer',
							icon: 'bi bi-envelope-paper-fill',
							desc: 'This is where you will start to tour homes and make offers on the ones you like!',
							link: 'https://www.realtor.com/advice/buy/the-basics-of-making-an-offer-on-a-house/'
						}
					]
				]
			}
		],
		[
			{
				numbers: [5, 6, 7, 8],
				completeNumber: 8,
				name: 'Closing Phase',
				steps: [
					[
						{
							number: '5',
							name: 'Accepted Offer',
							icon: 'bi bi-envelope-paper-heart-fill',
							desc: 'Your closing journey begins!',
							link: 'https://www.realtor.com/advice/buy/my-offer-was-accepted-now-what/'
						}
					],
					[
						{
							number: '6',
							name: 'Contingencies',
							icon: 'bi bi-list-ol',
							desc: 'Now we will handle any contingencies we set in the offer.',
							link: ''
						}
					],
					[
						{
							number: '7',
							name: 'Final Walk-Through',
							icon: 'bi bi-arrow-through-heart-fill',
							desc: '',
							link: ''
						}
					],
					[
						{
							number: '8',
							name: 'Closing Day',
							icon: 'bi bi-key-fill',
							desc: 'The home stretch! This is where you will sign paperwork and recieve the keys!',
							link: ''
						}
					]
				]
			}
		]
	];
</script>

{#if journey}
	{#each buyerPhases as phase}
		{#if phase[0].completeNumber < journey.step}
			<details>
				<summary>
					<i class="bi bi-check-circle-fill" id="checkmark" />
					<i class={phase[0].icon} />
					{phase[0].name}
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
						</details>
					{:else}
						<details class="future">
							<summary>
								<i class={step[0].icon} />
								{step[0].name}
							</summary>
						</details>
					{/if}
				{/each}
			</details>
		{:else if phase[0].completeNumber > journey.step}
			<details class="future">
				<summary> <strong>{phase[0].name}</strong> </summary>
			</details>
		{/if}
	{/each}
	{#if $currentUser.isAgent}
		<div>
			{#if journey.step > 1}
				<button on:click={moveBackward(journey)} class="secondary outline">
					Move back
				</button>
			{/if}
			{#if journey.step < 8}
				<button on:click={moveForward(journey)}>Move forward</button>
			{/if}
		</div>
	{/if}
{/if}

<style>
	div {
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
		opacity: 0.5;
		font-size: small;
	}

	.future {
		opacity: 0.3;
		font-size: small;
	}
</style>
