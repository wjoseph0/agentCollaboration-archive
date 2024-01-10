<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import Deadline from '$lib/components/Deadline.svelte';
	import { fade } from 'svelte/transition';
	import CreateDeadline from './CreateDeadline.svelte';

	let deadlines = [];
	let journeys = [];
	let loading = true;

	// const sortAscending = (a, b) => {
	// 	const date1 = new Date(a.date);
	// 	const date2 = new Date(b.date);
	// 	return date1 - date2;
	// };

	onMount(async () => {
		deadlines = await pb.collection('deadlines').getFullList({
			sort: '+due_date',
			expand: 'journey.client'
		});
		journeys = await pb.collection('journeys').getFullList({
			expand: 'client'
		});
		pb.collection('deadlines').subscribe('*', async function (e) {
			deadlines = await pb.collection('deadlines').getFullList({
				sort: '+due_date',
				expand: 'journey.client'
			});
		});
		loading = false;
	});

	onDestroy(async () => {
		await pb.collection('deadlines').unsubscribe();
	});
</script>

<div class="container">
	<br />
	<div class="prose text-center sm:text-left">
		<h1>Deadlines</h1>
	</div>
	<br />
	<table class="table">
		<thead>
			<tr>
				<th>Status</th>
				<th>Type</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
			{:else if deadlines.length > 0}
				{#each deadlines as deadline (deadline.id)}
					<tr in:fade class="hover cursor-pointer" onclick="c{deadline.id}.showModal()">
						<td>
							{#if deadline.status === 'created'}
								<span class="badge badge-ghost badge-lg" />
							{:else if deadline.status === 'scheduled'}
								<span class="badge badge-info badge-lg" />
							{:else if deadline.status === 'complete'}
								<span class="badge badge-success badge-lg" />
							{/if}
						</td>
						<td>
							<div class="flex items-center gap-2">
								<div class="avatar placeholder">
									<div class="mask mask-squircle bg-neutral-focus text-neutral-content w-8 prose">
										<span class="text-xs">
											{deadline.expand.journey.expand.client.fname[0]}
										</span>
									</div>
								</div>
								<div class="font-bold">
									{deadline.type}
								</div>
							</div>
						</td>
						<td>
							<p class="text-xs md:text-base prose">
								{deadline.due_date.substring(5, 7)}/{deadline.due_date.substring(
									8,
									10
								)}/{deadline.due_date.substring(0, 4)}
							</p>
						</td>
					</tr>
					<Deadline bind:deadline />
				{/each}
			{:else}
				<tr>
					<td class="text-xs prose"> No deadlines to show </td>
				</tr>
			{/if}
			<br /><br /><br />
		</tbody>
	</table>
</div>
{#if $currentUser.isAgent || $currentUser.isCoordinator}
	<CreateDeadline {journeys} />
{/if}
