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
			icon: 'bi bi-people-fill',
			desc: 'This is where you will officially hire your real estate agent to represent you during your journey.',
			link: 'https://study.com/learn/lesson/real-estate-agency-overview-types.html'
		},

		{
			number: '2',
			name: 'Mortgage Pre-Approval',
			icon: 'bi bi-hand-thumbs-up-fill',
			desc: '*Getting pre-approved for a mortgage lets you know how much money you can borrow, the range of interest rates you qualify for and the different mortgage options available to you.*',
			link: 'https://www.zillow.com/mortgage-learning/pre-approval/'
		},

		{
			number: '3',
			name: 'Preview Homes',
			icon: 'bi bi-search-heart-fill',
			desc: 'This is where you will start to tour homes and make offers on the ones you like!',
			link: 'https://www.realtor.com/advice/buy/the-basics-of-making-an-offer-on-a-house/'
		},
		{
			number: '4',
			name: 'Make Offer',
			icon: 'bi bi-envelope-paper-fill',
			desc: 'This is where you will start to tour homes and make offers on the ones you like!',
			link: 'https://www.realtor.com/advice/buy/the-basics-of-making-an-offer-on-a-house/'
		},

		{
			number: '5',
			name: 'Accepted Offer',
			icon: 'bi bi-envelope-paper-heart-fill',
			desc: 'Your closing journey begins!',
			link: 'https://www.realtor.com/advice/buy/my-offer-was-accepted-now-what/'
		},
		{
			number: '6',
			name: 'Contingencies',
			icon: 'bi bi-list-ol',
			desc: 'Now we will handle any contingencies we set in the offer.',
			link: ''
		},
		{
			number: '7',
			name: 'Final Walk-Through',
			icon: 'bi bi-arrow-through-heart-fill',
			desc: '',
			link: ''
		},
		{
			number: '8',
			name: 'Closing Day',
			icon: 'bi bi-key-fill',
			desc: 'The home stretch! This is where you will sign paperwork and recieve the keys!',
			link: ''
		}
	];
</script>

{#if journey}
	<div>
		{#each steps as step}
			<div class="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
				</figure>
				<div class="card-body h-50">
					<h2 class="card-title">{step.name}</h2>
					<p />
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Do Action</button>
					</div>
				</div>
			</div>
		{/each}
		{#if $currentUser.isAgent}
			<div>
				{#if journey.step > 1}
					<button on:click={moveBackward(journey)} class="secondary outline"> Move back </button>
				{/if}
				{#if journey.step < 8}
					<button on:click={moveForward(journey)}>Move forward</button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
