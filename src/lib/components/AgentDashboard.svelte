<script>
	import { pb } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import Client from '$lib/components/Client.svelte';

	let journeys = [];
	let files = [];
	let loading = false;

	const sortFunction = (a, b) => {
		const date1 = new Date(a.created);
		const date2 = new Date(b.created);
		return date2 - date1;
	};

	onMount(async () => {
		loading = true;
		journeys = await pb.collection('journeys').getFullList(200, {
			sort: '+step',
			expand: 'client'
		});

		pb.collection('journeys').subscribe('*', async () => {
			journeys = await pb.collection('journeys').getFullList(200, {
				sort: '+step',
				expand: 'client'
			});
		});

		files = await pb.collection('files').getFullList(200, {
			sort: '-created'
		});

		pb.collection('files').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				files.push(record);
				files = files.sort(sortFunction);
			} else if (action === 'update') {
				const i = files.findIndex((e) => e.id === record.id);
				files.splice(i, 1, record);
				files = files.sort(sortFunction);
			} else if (action === 'delete') {
				files = files.filter((f) => f.id !== record.id);
			}
		});
		loading = false;
	});

	onDestroy(async () => {
		pb.collection('files').unsubscribe();
	});
</script>

<div class="container">
	<br />
	<div class="prose text-center sm:text-left">
		<h1>Dashboard</h1>
	</div>
	<br />
	<div class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>Name</th>
					<th>Stage</th>
				</tr>
			</thead>
			<tbody>
				{#if loading}
					<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
				{:else if journeys.length > 0}
					{#each journeys as journey (journey.id)}
						<tr onclick="c{journey.id}.showModal()" class="cursor-pointer">
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
							<td>
								{#if journey.step === 1}
									<div class="btn btn-xs">Preparation</div>
								{:else if journey.step === 2}
									<div class="btn btn-xs btn-secondary">Searching</div>
								{:else if journey.step === 3}
									<div class="btn btn-xs btn-neutral">Accepted Offer</div>
								{:else if journey.step === 4}
									<div class="btn btn-xs btn-primary">Closing</div>
								{:else if journey.step === 5}
									<div class="btn btn-xs btn-accent">Closed</div>
								{/if}
							</td>
						</tr>
						<Client {journey} {files} />
					{/each}
				{:else}
					<tr>
						<td class="text-xs prose"> No journeys to show </td>
					</tr>
				{/if}
			</tbody>
		</table>
		<br><br><br>
	</div>
</div>
