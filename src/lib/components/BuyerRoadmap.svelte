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

	let steps = [
		{
			number: '1',
			name: 'Form Agency',
			desc: 'This is where you will hire your real estate agent to represent you during your journey.'
		},

		{
			number: '2',
			name: 'Mortgage Pre-Approval',
			desc: '*Getting pre-approved for a mortgage lets you know how much money you can borrow, the range of interest rates you qualify for and the different mortgage options available to you.*'
		},

		{
			number: '3',
			name: 'Preview Homes',
			desc: 'This is where you will start to tour homes and make offers on the ones you like!'
		},
		{
			number: '4',
			name: 'Make Offer',
			desc: 'This is where you will start to tour homes and make offers on the ones you like!'
		},

		{
			number: '5',
			name: 'Accepted Offer',
			desc: 'Your closing journey begins!'
		},
		{
			number: '6',
			name: 'Contingencies',
			desc: 'Now we will handle any contingencies we set in the offer.'
		},
		{
			number: '7',
			name: 'Final Walk-Through',
			desc: ''
		},
		{
			number: '8',
			name: 'Closing Day',
			desc: 'The home stretch! This is where you will sign paperwork and receive the keys!',
			link: ''
		}
	];
</script>

{#if journey}
	<div class="">
		<section class="flex justify-center">
			<ul class="steps steps-vertical">
				{#each steps as step}
					<li class="step h-screen w-fit">
						<div class="card w-auto bg-base-100 shadow-xl">
							<figure>
								<img src={step.img} alt="" />
							</figure>
							<div class="card-body h-50">
								<h2 class="card-title">{step.name}</h2>
								<p />
								<div class="card-actions justify-end">
									{#if step.name === 'Preview Homes'}
										<SearchProfile {journey} />
									{/if}
									{#if step.name === 'Make Offer'}
										<OfferCheatSheet {journey} />
									{/if}
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</div>
{/if}
