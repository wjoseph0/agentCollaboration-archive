<script>
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let journeys = [];

	onMount(async () => {
		journeys = await pb.collection('journeys').getFullList(200, {
			sort: '+step',
			expand: 'client'
		});
	});
</script>

<div class="container prose">
	<h1>Active Clients</h1>

	<div class="container prose">
		<h2>Preparation</h2>
		{#each journeys as journey}
			{#if journey.step == 1 || journey.step == 2}
				<p>{journey.expand.client.fname} {journey.expand.client.lname}</p>
				<p>{journey.step}</p>
			{/if}
		{/each}
		<h2>Searching</h2>
		{#each journeys as journey}
			{#if journey.step == 3 || journey.step == 4}
				<p>{journey.expand.client.fname} {journey.expand.client.lname}</p>
				<p>{journey.step}</p>
			{/if}
		{/each}
		<h2>Accepted Offer</h2>
		{#each journeys as journey}
			{#if journey.step == 5}
				<p>{journey.expand.client.fname} {journey.expand.client.lname}</p>
				<p>{journey.step}</p>
			{/if}
		{/each}
		<h2>Closing</h2>
		{#each journeys as journey}
			{#if journey.step == 6 || journey.step == 7}
				<p>{journey.expand.client.fname} {journey.expand.client.lname}</p>
				<p>{journey.step}</p>
			{/if}
		{/each}
	</div>
</div>
