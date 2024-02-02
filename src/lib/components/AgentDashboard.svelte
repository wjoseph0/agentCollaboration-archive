<script>
	import { pb } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import Client from '$lib/components/Client.svelte';
	import Invite from '$lib/components/Invite.svelte';

	let journeys = [];
	let deadlines = [];
	let files = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		journeys = await pb.collection('journeys').getFullList(200, {
			sort: '-updated',
			expand: 'client'
		});
		pb.collection('journeys').subscribe('*', async () => {
			journeys = await pb.collection('journeys').getFullList(200, {
				sort: '-updated',
				expand: 'client'
			});
		});
		deadlines = await pb.collection('deadlines').getFullList({
			sort: '+due_date'
		});
		pb.collection('deadlines').subscribe('*', async function () {
			deadlines = await pb.collection('deadlines').getFullList({
				sort: '+due_date'
			});
		});
		files = await pb.collection('files').getFullList(200, {
			sort: '-updated'
		});
		pb.collection('files').subscribe('*', async () => {
			files = await pb.collection('files').getFullList(200, {
				sort: '-updated'
			});
		});
		loading = false;
	});

	onDestroy(async () => {
		pb.collection('journeys').unsubscribe();
		pb.collection('deadlines').unsubscribe();
		pb.collection('files').unsubscribe();
	});
</script>

<div class="container">
	<br />
	<div class="prose text-center sm:text-left">
		<h1>Dashboard</h1>
	</div>
	<br />
	<div class="mb-64">
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{#if loading}
					<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
				{:else if journeys.length > 0}
					{#each journeys as journey (journey.id)}
						<tr onclick="c{journey.id}.showModal()" class="cursor-pointer hover:bg-base-200">
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar placeholder">
										<div
											class="mask mask-squircle bg-neutral-focus text-neutral-content w-12 h-12 prose"
										>
											<span>
												{journey.expand.client.fname[0]}{journey.expand.client.lname[0]}
											</span>
										</div>
									</div>
									<div>
										<div class="font-bold">
											{journey.expand.client.fname}
											{journey.expand.client.lname}
										</div>
									</div>
								</div>
							</td>
						</tr>
						<Client {journey} {deadlines} {files} {loading} />
					{/each}
				{:else}
					<tr>
						<td class="prose flex items-center justify-center gap-2">
							Invite your first client
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
								/>
							</svg>
						</td>
						<td><Invite /></td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
