<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import SearchProfile from '$lib/components/SearchProfile.svelte';
	import StartJourney from './StartJourney.svelte';
	import preparationImg from '$lib/assets/preparation-img.jpg';
	import searchingImg from '$lib/assets/searching-img.jpg';
	import closingImg from '$lib/assets/closing-img.jpg';

	let journey;
	let noJourney;

	onMount(async () => {
		try {
			journey = await pb.collection('journeys').getList(1, 1, {});

			// Subscribe to changes only in the specified record
			await pb.collection('journeys').subscribe(journey.id, async (e) => {
				journey = e.record;
			});
		} catch (error) {
			noJourney = true;
		}
	});

	onDestroy(() => {
		pb.collection('journeys').unsubscribe();
	});

	let stages = [
		{ name: 'Preparation', step: 1 },
		{ name: 'Searching', step: 2 },
		{ name: 'Closing', step: 3 },
		{ name: 'Closed', step: 4 }
	];
</script>

{#if journey}
	<div class="container">
		<br />
		<div class="prose text-center mx-auto">
			<h1>Your Journey</h1>
		</div>
		<br />
		<section class="flex justify-center">
			<ul class="steps steps-vertical">
				{#each stages as stage}
					<li class="step w-full">
						<div class="card w-auto bg-base-100 shadow-xl">
							<figure>
								{#if stage.step === 1}
									<img src={preparationImg} alt="" />
								{:else if stage.step === 2}
									<img src={searchingImg} alt="" />
								{:else if stage.step === 3}
									<img src={closingImg} alt="" />
								{/if}
							</figure>
							<div class="card-body h-50">
								<h2 class="card-title">{stage.name}</h2>

								<div class="card-actions flex">
									{#if stage.step === 2}
										<SearchProfile {journey} />
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
{:else if noJourney}
	<div class="h-screen flex justify-center items-center">
		<StartJourney />
	</div>
{/if}
