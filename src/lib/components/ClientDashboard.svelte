<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';
	import Deadlines from '$lib/components/Deadlines.svelte';

	let journey;
	let deadlines;

	onMount(async () => {
		journey = await pb
			.collection('journeys')
			.getFirstListItem(`client='${$currentUser.id}' && agent='${$currentUser.agent}'`);
		deadlines = await pb.collection('deadlines').getFullList({
			sort: '+due_date'
		});
		pb.collection('deadlines').subscribe('*', async function () {
			deadlines = await pb.collection('deadlines').getFullList({
				sort: '+due_date'
			});
		});
	});
</script>

<div class="container">
	<div class="flex flex-col gap-40 prose text-center mx-auto mt-5 mb-24">
		<h1>Home</h1>
		<div class="flex flex-col gap-10">
			{#if journey}
				<OfferCheatSheet {journey} />
				<Deadlines {journey} {deadlines} />
			{/if}
		</div>
	</div>
</div>
